import { FeedbackFormTypes } from "./components/feedback-form/feedback-form.interface";

export interface IFeedbackStore {
    type: FeedbackFormTypes;
    description: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
}
