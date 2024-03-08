import { IConfig, CounterType } from "./types";

export class Activity {
  defaultConfig: Required<IConfig> = {
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
  counter: CounterType;
  eventFlag: boolean;
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
  }

  init() {
    if (this.counter.achiev != -1 || this.data.forceStart) {
      this.bind(this.data.eventList, () => {
        this.eventTrigger();
      });
      if (this.data.forceStart) this.counter.achiev = 0;
      console.log(`init activity ${this.data.cookieName}`);
      this.process();
    }
  }
  bind(eventList: string, fn: () => void) {
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
  eventTrigger() {
    this.eventFlag = true;
  }
  loadMultiData() {
    const cookieValue = this.getCookieValue(this.data.cookieName);
    if (cookieValue) {
      const value = cookieValue.split("|");
      this.counter.test = parseInt(value[0] || "0");
      this.counter.achiev = parseInt(value[1] || "0");
      return;
    }
    this.counter.test = this.counter.achiev = 0;
  }
  process() {
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

  getCookieValue(name: string) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
    return undefined;
  }
}
