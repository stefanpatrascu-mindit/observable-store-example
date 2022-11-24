import { ObservableStore } from '@codewithdan/observable-store';
import { debounceTime, filter, map, Observable, tap } from 'rxjs';

export abstract class BaseStore<T> extends ObservableStore<T> {

    protected lastState: Partial<T> = {};
    protected localStorageProperty: string = 'default';
    protected abstract initialState: T;

    public clear(): void {
        this.setState(this.initialState, 'CLEAR_STATE');
    }

    protected hydrateStore(): void {
        const storageData: string | null = localStorage.getItem(this.localStorageProperty);
        let state: T = this.initialState;
        if (storageData) {
            state = JSON.parse(storageData);
        }
        this.setState(state, 'INIT_STATE');
    }

    protected onStoreStateChanged(): void {
        this.stateChanged
            .pipe(
                debounceTime(500),
                tap(() => {
                    localStorage.setItem(this.localStorageProperty, JSON.stringify(this.getStoreState()));
                })
            )
            .subscribe();
    }

    /*
        This function will help us to watch changes for a property
     */
    protected getStoreProperty<O>(key: keyof T, defaultValue: object[] | string | number | null | boolean = []):
        Observable<O> {
        return (this.stateChanged.pipe(
            filter((stateChanged: T) => {
                const changedState: boolean = this.lastState[key] && JSON.stringify(this.lastState[key]) !== JSON.stringify(stateChanged[key]) || !this.lastState[key];
                this.lastState[key] = stateChanged[key];
                return changedState;
            }),
            map((state: T) =>
                state[key] || defaultValue
            )
        )) as unknown as Observable<O>;
    }

    private getStoreState(): object {
        const currentState: { [key: string]: any; } = this.getState();
        const keys: string[] = Object.keys(this.initialState);

        const output: { [key: string]: any; } = {};
        for (const key of keys) {
            if (currentState[key]) {
                output[key] = currentState[key];
            }
        }
        return output;
    }


}
