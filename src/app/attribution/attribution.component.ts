import { Component } from '@angular/core';
import attribution from '../data/wiki-attribution.json';

interface WikiAsset {
  file: string;
  wikiFile: string;
  sourceUrl: string;
}

interface WikiAttribution {
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  note: string;
  retrievedAt: string;
  assets: WikiAsset[];
}

@Component({
  selector: 'app-attribution',
  standalone: true,
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.scss'],
})
export class AttributionComponent {
  readonly data = attribution as WikiAttribution;
  readonly assets = this.data.assets;
}
