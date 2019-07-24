import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto, MyRentalDto } from '~/shared/dto';
import { AngularFireAuth } from '@angular/fire/auth';
import { MyRentalService } from '~/+my-rental/shared/services/my-rental.service';
import { BaseComponent } from '~/framework';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '~/shared/services';

@Component({
  selector: 'crs-my-rental-index',
  templateUrl: './my-rental-index.component.html',
  styleUrls: ['./my-rental-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyRentalIndexComponent extends BaseComponent implements OnInit {
  myRentals$: Observable<Array<MyRentalDto>>;

  constructor(private readonly myRentalService: MyRentalService,
              private readonly snackBar: MatSnackBar,
              public readonly tokenService: TokenService) {
    super();
  }

  ngOnInit() {
    this.loadMyRentals();
  }

  backCar(carId: string) {
    this.myRentalService
      .backCar(carId)
      .subscribe(
        () => {
          this.snackBar.open('You successfully return car', 'Ok', {
            duration: 2000
          });
        },
        message => {
          this.snackBar.open(message, 'Ok');
        }
      );
  }

  private loadMyRentals() {
    this.myRentals$ = this.myRentalService.getMyRental();
  }

}
