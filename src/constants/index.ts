export class App_Settings {
  public static WASH_WASH_DOMAIN = 'http://washwash.inspirepro.co.in/api';
  public static API_GET_PRODUCTS = `${this.WASH_WASH_DOMAIN}/getItems`;
  public static API_GET_CATEGORIES = `${this.WASH_WASH_DOMAIN}/getCategory`;
  public static API_GET_DEALS = `${this.WASH_WASH_DOMAIN}/getdeals`;
  public static API_GET_TIMESLOTS = `${this.WASH_WASH_DOMAIN}/getTimeSlots`;
  public static API_GET_CUSTOMER_INFO = `${this.WASH_WASH_DOMAIN}/getcustomer`;
  public static API_POST_CREATE_ORDER = `${this.WASH_WASH_DOMAIN}/placeorder`;
  public static API_GET_ALL_ORDERS = `${this.WASH_WASH_DOMAIN}/allorders`;
}
