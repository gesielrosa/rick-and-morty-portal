import {Component, Input} from '@angular/core';

import {ChartComponent, ChartOptions, groupByKey} from '@libs/shared';
import {Character} from '@libs/characters';

@Component({
  standalone: true,
  selector: 'app-status-per-location-chart',
  templateUrl: 'status-per-location-chart.component.html',
  styleUrls: ['status-per-location-chart.component.scss'],
  imports: [ChartComponent],
})
export class StatusPerLocationChartComponent {
  @Input() set data(value: {location: string; status: string; species: string; item: Character}[]) {
    value ? this._setChartOptions(value) : null;
  }

  public chartOptions: Partial<ChartOptions>;

  private _setChartOptions(data: {location: string; status: string; species: string; item: Character}[]): void {
    const grouped = this._groupByStatus(data, 'location');

    let series = grouped.map((group) => {
      const status = Object.keys(group.groups).map((key) => {
        return {
          x: key,
          y: group.groups[key].length,
        };
      });
      return {
        name: group.name,
        data: status,
      };
    });

    series = series.sort((a, b) => {
      return b.data[0].y - a.data[0].y;
    });

    series = series.slice(0, 10);

    this.chartOptions = {
      series,
      legend: {
        show: true,
        position: 'bottom',
      },
      chart: {
        type: 'treemap',
        toolbar: {
          show: false,
        },
        foreColor: '#fff',
      },
      title: {
        text: undefined,
      },
      tooltip: {
        theme: 'dark',
      },
      colors: ['#75df23', '#0984e2', '#f9d622', '#ff6c3f', '#7F3FFF'],
    };
  }

  private _groupByStatus(resp: any, key: string): {name: string; groups: any}[] {
    const groupedLocations = groupByKey(resp, key);
    return Object.keys(groupedLocations).map((key) => {
      const groupedStatus = groupByKey(groupedLocations[key], 'status');
      return {
        name: key,
        groups: groupedStatus,
      };
    });
  }
}
