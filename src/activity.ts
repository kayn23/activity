type CounterType = {
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
export class Activity {
  private defaultConfig: Required<IConfig> = {
    achieveTime: 60,
    callback: () => {
      console.log("Achieved!");
    },
    cookieName: "activity",
    forceStart: false,
    loop: false,
    eventList:
      "touchmove blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error",
    testPeriod: 10,
    useMultiMode: false,
    watchEvery: 1,
  };
  data: Required<IConfig>;
  private counter: CounterType;
  private eventFlag: boolean;
  constructor(initConfig: IConfig) {
    this.data = Object.assign({}, this.defaultConfig, initConfig);
    this.data.watchEvery *= 1000;
    this.eventFlag = false;
    this.counter = {
      test: 0,
      achiev: 0,
    };

    if (this.data.useMultiMode) {
      this.loadMultiData();
    }

    if (this.counter.achiev != -1 || this.data.forceStart) {
      this.bind(this.data.eventList, () => {
        this.eventTrigger();
      });
      if (this.data.forceStart) this.counter.achiev = 0;
      this.process();
    }
  }

  public init() {}
  private bind(eventList: string, fn: () => void) {
    const body = document.querySelector("body");
    const list = eventList.split(" ");
    if (body) {
      list.forEach((item) => {
        body.addEventListener(item, fn);
      });
    } else {
      throw new Error("body not found");
    }
  }
  private eventTrigger() {
    this.eventFlag = true;
  }
  private loadMultiData() {
    const cookieValue = this.getCookieValue(this.data.cookieName);
    if (cookieValue) {
      const value = cookieValue.split("|");
      this.counter.test = parseInt(value[0] || "0");
      this.counter.achiev = parseInt(value[1] || "0");
      return;
    }
    this.counter.test = this.counter.achiev = 0;
  }
  private process() {
    this.counter.test += 1;
    if (this.counter.test === this.data.testPeriod) {
      if (this.eventFlag) {
        this.eventFlag = false;
        this.counter.achiev += this.data.testPeriod;
      }
      this.counter.test = 0;
    }
    const timerHand = setTimeout(() => {
      this.process();
    }, this.data.watchEvery);
    if (this.counter.achiev >= this.data.achieveTime) {
      if (!this.data.loop) clearTimeout(timerHand);
      this.counter.achiev = this.data.loop ? 0 : -1;
      this.data.callback.call(this);
    }
    if (this.data.useMultiMode) {
      document.cookie = `${this.data.cookieName}=${this.counter.test}|${this.counter.achiev}; path=/;`;
    }
  }

  private getCookieValue(name: string) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
    return undefined;
  }
}
