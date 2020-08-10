import Animated, {
  decay,
  startClock,
  cond,
  and,
  eq,
  not,
  add,
  set,
  neq,
  Value,
  block,
  Clock,
  stopClock,
  clockRunning,
  debug,
} from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

interface WithDecayParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Node<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
}

export const withDecay = (config: WithDecayParams) => {
  const { value, velocity, state, offset, deceleration } = {
    offset: new Value(0),
    deceleration: 0.998,
    ...config,
  };
  const clock = new Clock();
  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishDecay = [set(offset, decayState.position), stopClock(clock)];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(neq(state, State.END), [
      set(decayState.finished, 0),
      set(decayState.position, add(offset, value)),
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(decayState.finished)), [
        set(decayState.velocity, velocity),
        set(decayState.time, 0),
        startClock(clock),
      ]),
      decay(clock, decayState, { deceleration }),
      cond(decayState.finished, finishDecay),
    ]),
    decayState.position,
  ]);
};
