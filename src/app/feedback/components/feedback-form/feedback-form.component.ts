import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FeedbackFormTypes } from "./feedback-form.interface";
import { FeedbackStore } from "../../feedback.store";
import { IFeedbackStore } from "../../feedback.interface";

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    public form!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private feedbackStore: FeedbackStore) {
    }

    public ngOnInit(): void {
        this.generateReactiveForm();
        this.onStateChanged();
        this.onChangeFields();


        this.feedbackStore.getDescription().subscribe((description: string | null) => {
            console.log('Current description:', description)
        });
    }

    public submitForm(): void {
        alert('Your feedback has been sent');
        this.resetForm();
    }

    public resetForm(): void {
        this.feedbackStore.clear();
        this.form.markAsPristine()
    }

    private onChangeFields(): void {
        this.onChangeType();
        this.onChangeDescription();
        this.onChangeFirstName();
        this.onChangeLastName();
        this.onChangeEmail();
    }

    private generateReactiveForm() {
        this.form = this.formBuilder.group({
            type: new FormControl<FeedbackFormTypes>('Comments', [Validators.required]),
            description: new FormControl<string | null>(null, [Validators.required]),
            firstName: new FormControl<string | null>(null, [Validators.required]),
            lastName: new FormControl<string | null>(null, [Validators.required]),
            email: new FormControl<string | null>(null, [Validators.required])
        });
    }

    private onStateChanged(): void {
        this.feedbackStore.stateChanged.subscribe((state: IFeedbackStore) => {
            this.form.controls['type'].setValue(state.type, {emitEvent: false});
            this.form.controls['description'].setValue(state.description, {emitEvent: false});
            this.form.controls['firstName'].setValue(state.firstName, {emitEvent: false});
            this.form.controls['lastName'].setValue(state.lastName, {emitEvent: false});
            this.form.controls['email'].setValue(state.email, {emitEvent: false});
        });
    }

    private onChangeType(): void {
        this.form.controls['type'].valueChanges.subscribe((type: FeedbackFormTypes) => {
            this.feedbackStore.setType(type);
        });
    }

    private onChangeDescription(): void {
        this.form.controls['description'].valueChanges.subscribe((description: string) => {
            this.feedbackStore.setDescription(description);
        });
    }

    private onChangeFirstName(): void {
        this.form.controls['firstName'].valueChanges.subscribe((firstName: string) => {
            this.feedbackStore.setFirstName(firstName);
        });
    }

    private onChangeLastName(): void {
        this.form.controls['lastName'].valueChanges.subscribe((lastName: string) => {
            this.feedbackStore.setLastName(lastName);
        });
    }

    private onChangeEmail(): void {
        this.form.controls['email'].valueChanges.subscribe((email: string) => {
            this.feedbackStore.setEmail(email);
        });
    }
}
