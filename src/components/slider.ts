import { attachClickEvent } from "../helpers/dom";
import { horizontalMenu } from "./horizontalMenu";

export interface SliderTab {
  onOpen?: () => void,
  onOpenAfterTimeout?: () => void,
  onClose?: () => void,
  onCloseAfterTimeout?: () => void
}

export class SuperSliderTab implements SliderTab {
  public id: number;
  public closeBtn: HTMLElement;

  // fix incompability
  public onOpen: SliderTab['onOpen'];

  constructor(protected slider: SidebarSlider, public container: HTMLElement) {
    this.closeBtn = this.container.querySelector('.sidebar-close-button');
    this.id = this.slider.addTab(this);
  }

  public close() {
    return this.slider.closeTab(this.id);
  }

  public open() {
    return this.slider.selectTab(this);
  }
}

const TRANSITION_TIME = 250;

export default class SidebarSlider {
  protected _selectTab: (id: number) => void;
  public historyTabIds: number[] = [];

  constructor(public sidebarEl: HTMLElement, public tabs: {[id: number]: SliderTab} = {}, private canHideFirst = false) {
    this._selectTab = horizontalMenu(null, this.sidebarEl.querySelector('.sidebar-slider') as HTMLDivElement, null, null, TRANSITION_TIME);
    if(!canHideFirst) {
      this._selectTab(0);
    }

    Array.from(this.sidebarEl.querySelectorAll('.sidebar-close-button') as any as HTMLElement[]).forEach(el => {
      attachClickEvent(el, () => this.closeTab());
    });
  }

  public closeTab = (tabId?: number) => {
    if(tabId !== undefined && this.historyTabIds[this.historyTabIds.length - 1] != tabId) {
      return false;
    }

    //console.log('sidebar-close-button click:', this.historyTabIDs);
    let closingId = this.historyTabIds.pop(); // pop current
    this.onCloseTab(closingId);
    this._selectTab(this.historyTabIds[this.historyTabIds.length - 1] ?? (this.canHideFirst ? -1 : 0));
    return true;
  };

  public selectTab(id: number | SuperSliderTab): boolean {
    if(id instanceof SuperSliderTab) {
      id = id.id;
    }

    if(this.historyTabIds[this.historyTabIds.length - 1] == id) {
      return false;
    }

    const tab = this.tabs[id];
    if(tab) {
      if(tab.onOpen) {
        tab.onOpen();
      }
  
      if(tab.onOpenAfterTimeout) {
        setTimeout(() => {
          tab.onOpenAfterTimeout();
        }, TRANSITION_TIME);
      }
    }
    
    this.historyTabIds.push(id);
    this._selectTab(id);
    return true;
  }

  public removeTabFromHistory(id: number) {
    this.historyTabIds.findAndSplice(i => i == id);
    this.onCloseTab(id);
  }

  public onCloseTab(id: number) {
    let tab = this.tabs[id];
    if(tab) {
      if(tab.onClose) {
        tab.onClose();
      }

      if(tab.onCloseAfterTimeout) {
        setTimeout(() => {
          tab.onCloseAfterTimeout();
        }, TRANSITION_TIME);
      }
    }
  }

  public addTab(tab: SuperSliderTab) {
    let id: number;
    if(tab.container.parentElement) {
      id = Array.from(this.sidebarEl.children).findIndex(el => el == tab.container);
    } else {
      id = this.sidebarEl.childElementCount;
      this.sidebarEl.append(tab.container);

      if(tab.closeBtn) {
        tab.closeBtn.addEventListener('click', () => this.closeTab());
      }
    }

    this.tabs[id] = tab;

    return id;
  }
}