import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy, Component } from '@angular/core';

import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})


export class ClockComponent implements OnChanges, OnDestroy {

  private counter$ = new Subject<any>();
  private countSub$: SubscriptionLike;

  @Input() counter: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {

    this.countSub$ = this.counter$.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => this.value.emit(--options.count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this.counter$.next({ count: this.counter, interval: this.interval });
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }

}
