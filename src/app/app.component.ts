import { Component, HostBinding } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink,  RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,
    MatProgressSpinnerModule, RouterLink,
    MatSlideToggleModule, FormsModule,
    MatToolbarModule, MatIconModule, MatButtonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  toggleControl = new FormControl(false);

  @HostBinding('class') componentCssClass : any ;

  constructor(public overlay: OverlayContainer) {
    
  }
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-Mode';
      const ligthClassName = 'light-theme';
      darkMode ? this.onSethem(darkClassName) : this.onSethem(ligthClassName);
    });
    
  }
  public onSethem(e: string) {
    this.overlay.getContainerElement().classList.add(e);
    this.componentCssClass = e;

}

}
