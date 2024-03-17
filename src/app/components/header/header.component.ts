import { BreakpointObserver, Breakpoints  } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private observer: BreakpointObserver, private authenticationService: AuthenticationService,  private router: Router,  private cdRef: ChangeDetectorRef) { }
  isSidenavCollapsed = false;
  isSidenavSmallerScreen = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  

  ngOnInit() {}

  ngAfterViewInit() {
    this.observer.observe([
      '(max-width: 800px)'
    ]).subscribe((res) => {
      if (res.matches) {
        this.sidenav?.close();
        this.isSidenavSmallerScreen = !this.isSidenavSmallerScreen;
      } else {
        this.sidenav?.open();
      }
      this.cdRef.detectChanges(); 
    });
  }

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
    if(this.isSidenavSmallerScreen){
      this.sidenav?.toggle();
    }
  }
  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then(() => {
    window.location.reload();
  });
    
  }
  
}
