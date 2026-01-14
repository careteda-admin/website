import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
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
      const homeSection = document.getElementById('home');
      const contactSection = document.getElementById('contact');

      if (homeSection && contactSection) {
        // Offset for navbar + some buffer
        const contactOffset = contactSection.offsetTop - (window.innerHeight / 2);

        // Check if we are at the bottom of the page
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;

        if (scrollPosition >= contactOffset || atBottom) {
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
