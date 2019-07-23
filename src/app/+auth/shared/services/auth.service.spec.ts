import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';

const credentialsMock = {
  email: 'fake@mail.com',
  password: 'password',
  fullName: 'Fake'
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);

  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);

  return Promise.resolve();
};

const fakeUpdateProfile = (): Promise<any> => {
  return Promise.resolve();
}


const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
    user: {
      updateProfile: jasmine.createSpy('updateProfile')
        .and
        .callFake(fakeUpdateProfile)
    }
  },
};


describe('AuthService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AngularFireAuth, useValue: angularFireAuthStub
        }
      ]
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
  });


  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  describe('.signUp', () => {
    it('should register a new user', () => {
      service.signUp(credentialsMock)
        .subscribe();

      expect(afAuth.auth.createUserWithEmailAndPassword)
        .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
    });
  });

  describe('.signIn', () => {
    it('should login user', () => {
      service.signIn(credentialsMock)
        .subscribe();

      expect(afAuth.auth.signInWithEmailAndPassword)
        .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
    });
  });
});
