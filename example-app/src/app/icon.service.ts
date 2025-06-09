import { Injectable, inject } from '@angular/core';
import { faBug, fas } from '@fortawesome/free-solid-svg-icons';

import { FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';

@Injectable({ providedIn: 'root' })
export class IconService {
  private fa = inject(FaIconLibrary);
  private fac = inject(FaConfig);

  constructor() {
    this.fac.defaultPrefix = 'fas';
    this.fac.fixedWidth = true;
    this.fac.fallbackIcon = faBug;
    this.fa.addIconPacks(fas);
  }
}
