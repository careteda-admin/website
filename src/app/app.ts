import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html'
})
export class App {
  title = 'CaretEDA';
  activeSection: string = 'home';
  isScrolled: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 50;

      // Determine active section
      const contactSection = document.getElementById('contact');

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();

        // Check if the contact section has moved up into the "active" zone
        // We switch to contact when its top edge is above the midpoint of the screen
        // or a fixed header offset
        const offset = window.innerWidth < 768 ? window.innerHeight * 0.6 : 200;

        if (scrollPosition < 50) {
          this.activeSection = 'home';
        } else if (rect.top <= offset) {
          this.activeSection = 'contact';
        } else {
          this.activeSection = 'home';
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Set active immediately for better UX
        this.activeSection = sectionId;
      }
    }
  }
}
