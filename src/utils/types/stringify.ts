import { RecordObject } from "@/routes/build-route-paths";

export type Stringify<T extends RecordObject> = {
  [key in keyof T]: string;
};
