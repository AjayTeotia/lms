import "server-only";

import arject, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arject({
  key: env.ARCJET_KEY,

  characteristics: ["fingerprints"],

  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
