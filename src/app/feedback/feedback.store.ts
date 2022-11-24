import { IFeedbackStore } from "./feedback.interface";
import { Injectable } from "@angular/core";
import { BaseStore } from "../store/base-store";
import { FeedbackFormTypes } from "./components/feedback-form/feedback-form.interface";
import { Observable, of } from "rxjs";

const initialState: IFeedbackStore = {
    type: 'Comments',
    description: null,
    firstName: null,
    lastName: null,
    email: null
};

enum FeedbackStoreAction {
    DESCRIPTION_UPDATED = 'DESCRIPTION_UPDATED',
    TYPE_UPDATED = 'TYPE_UPDATED',
    FIRSTNAME_UPDATED = 'FIRSTNAME_UPDATED',
    LASTNAME_UPDATED = 'LASTNAME_UPDATED',
    EMAIL_UPDATED = 'EMAIL_UPDATED'
}

@Injectable({
    providedIn: 'root'
})
export class FeedbackStore extends BaseStore<IFeedbackStore> {

    protected override localStorageProperty: string = 'FeedbackStore';
    protected initialState: IFeedbackStore = initialState;

    constructor() {
        super({trackStateHistory: false, logStateChanges: false});
        this.hydrateStore();
        this.onStoreStateChanged();
    }

    public setDescription(description: string): void {
        this.setState({description}, FeedbackStoreAction.DESCRIPTION_UPDATED);
    }

    public getDescription(): Observable<string | null> {
        return this.getStoreProperty<string>('description', null);
    }

    public setType(type: FeedbackFormTypes): void {
        this.setState({type}, FeedbackStoreAction.TYPE_UPDATED);
    }

    public getType(): Observable<FeedbackFormTypes> {
        return this.getStoreProperty<FeedbackFormTypes>('type', 'Comments');
    }

    public setFirstName(firstName: string): void {
        this.setState({firstName}, FeedbackStoreAction.FIRSTNAME_UPDATED);
    }

    public getFirstName(): Observable<string | null> {
        return this.getStoreProperty<string>('firstName', null);
    }

    public setLastName(lastName: string): void {
        this.setState({lastName}, FeedbackStoreAction.LASTNAME_UPDATED);
    }

    public getLastName(): Observable<string | null> {
        return this.getStoreProperty<string>('lastName', null);
    }

    public setEmail(email: string): void {
        this.setState({email}, FeedbackStoreAction.EMAIL_UPDATED);
    }

    public getEmail(): Observable<string | null> {
        return this.getStoreProperty<string>('email', null);
    }
}

