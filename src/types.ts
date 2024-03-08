export type CounterType = {
  test: number;
  achiev: number;
};

export interface IConfig {
  achieveTime: number; // default: 60, time expiration
  callback: () => void;
  /**
   * default: 'activity'
   */
  cookieName: string;
  /**
   * default: false
   */
  forceStart?: boolean;
  /**
   * derault: false
   */
  loop?: boolean; // default: false
  /**
   * default: "touchmove blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error"
   **/
  eventList?: string;
  /**
   * default: 10
   */
  testPeriod?: number;
  /**
   * default: false
   */
  useMultiMode?: boolean;
  /**
   * default: 1
   */
  watchEvery?: number;
}
