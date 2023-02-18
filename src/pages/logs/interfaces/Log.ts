import { EventWrapper, Alert, Observe, Subscription, Error } from '.';

type ILog = EventWrapper<Alert & Observe & Subscription & Error>;

export default ILog;
