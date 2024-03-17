import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private readonly apiUrl = 'https://localhost:7087/api/Authentication/login';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Authentication/login';
  private timer: ReturnType<typeof setTimeout> | undefined;
  logoutEvent = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router) { 
    this.checkTimer();
  }

login(username: string, password: string): Observable<boolean> {
    const data = {username, password };
return this.http.post(`${this.apiUrl}`, data, { observe: 'response' })
.pipe(
  map((response: { status: number; }) => {
    if (response.status === 200) {
      console.log("response.status", response.status)
        localStorage.setItem('Admin', JSON.stringify(data));
       localStorage.setItem('lastActivityW', JSON.stringify(Date.now()));
      this.startTimer();
      return true;
    } else {
      return false;
    }
  })
);
 
} 


logout(): void {
    localStorage.removeItem('Admin');
    localStorage.removeItem('lastActivityW');
    this.stopTimer();
}


private stopTimer(): void {
  if (this.timer) {
      clearTimeout(this.timer);
      document.removeEventListener('click', this.resetTimerHandler);
      document.removeEventListener('keypress', this.resetTimerHandler);
  }
}

private resetTimer(): void {
  this.stopTimer();
  this.startTimer();
}

private resetTimerHandler = () => {
  this.resetTimer();
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('Admin');
}



private startTimer(): void {
  const timeout = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const expiresAt = Date.now() + timeout;
  localStorage.setItem('timerExpiresAt', JSON.stringify(expiresAt));
  this.setTimer(timeout);
}


private setTimer(timeout: number): void {
  this.timer = setTimeout(() => {
    this.logout();
    this.router.navigate(['/login']);
  }, timeout);
  document.addEventListener('click', this.resetTimerHandler);
  document.addEventListener('keypress', this.resetTimerHandler);
}

private checkTimer(): void {
  const storedExpiresAt = JSON.parse(localStorage.getItem('timerExpiresAt')!!);
  if (storedExpiresAt) {
    const timeout = storedExpiresAt - Date.now();
    if (timeout > 0) {
      this.setTimer(timeout);
    } else {
      this.logout();
    }
  }
}
}
