# Activity

This module provides a simple interface for tracking the actual user activity on the page.

### Instalation

```
npm i @kayn23/activitymonitor
```

### Usage

```javascript
import { Activity } from "@kayn23/activitymonitor";

const event10 = new Activity({
  achieveTime: 20,
  cookieName: "test_event_20",
  useMultiMode: true,
  callback: () => {
    console.log("achiev 20");
  },
});

event10.init();
```

### Init params

| field         | defaul value                                                                                                                                                                                            | description                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| achieveTime   | 60                                                                                                                                                                                                      | time expiration                                                  |
| callback      | function                                                                                                                                                                                                | callback call after expiration time                              |
| cookieName    | 'activity'                                                                                                                                                                                              | cookie name, unique                                              |
| forseStart    | false                                                                                                                                                                                                   | whether to run expired achievements when visiting the page again |
| loop          | false                                                                                                                                                                                                   | re-track after oxpiration                                        |
| eventList     | "touchmove blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error" | list of events to track                                          |
| testPeriod    | 10                                                                                                                                                                                                      | user activity check interval                                     |
| userMultiMode | false                                                                                                                                                                                                   | enable cookies for cross-page event checking                     |
| watchEvery    | 1                                                                                                                                                                                                       | verification speed                                               |
