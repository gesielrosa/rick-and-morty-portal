import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _renderer: Renderer2;

  private _loaderElement: HTMLElement;

  constructor(@Inject(DOCUMENT) private _document: Document, private rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  public show(): void {
    this._createElement();
  }

  public hide(): void {
    this._removeElement();
  }

  private _createElement(): void {
    if (!this._loaderElement) {
      const container: HTMLInputElement = this._renderer.createElement('div');
      container.classList.add('loader');
      container.innerHTML = '<img class="loader-spinner" src="assets/images/loader.png" alt="Loading..." />';
      this._loaderElement = container;
      this._renderer.appendChild(this._document.body, container);
    }
  }

  private _removeElement(): void {
    if (this._loaderElement) {
      this._renderer.removeChild(this._document.body, this._loaderElement);
      this._loaderElement = null;
    }
  }
}
