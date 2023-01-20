import {Component, Input} from '@angular/core';

import {ChartComponent, ChartOptions, groupByKey} from '@libs/shared';
import {Character} from '@libs/characters';

@Component({
  standalone: true,
  selector: 'app-status-per-species-chart',
  templateUrl: 'status-per-species-chart.component.html',
  styleUrls: ['status-per-species-chart.component.scss'],
  imports: [ChartComponent],
})
export class StatusPerSpeciesChartComponent {
  @Input() set data(value: {location: string; status: string; species: string; item: Character}[]) {
    value ? this._setChartOptions(value) : null;
  }

  public chartOptions: Partial<ChartOptions>;

  private _setChartOptions(data: {location: string; status: string; species: string; item: Character}[]): void {
    const groupedSpecies = this._groupByStatus(data, 'species');

    const seriesDataAndNames = ['Alive', 'Dead', 'unknown'].map((status) => {
      const seriesData = groupedSpecies.map((item) => {
        const statusGroup = item.groups[status];
        return statusGroup ? statusGroup.length : 0;
      });

      return {
        name: status,
        data: seriesData,
      };
    });

    const categories = groupedSpecies.map((item) => item.name);

    this.chartOptions = {
      chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false,
        },
        foreColor: '#fff',
      },
      series: seriesDataAndNames,
      colors: ['var(--text-primary-color)', 'var(--text-danger-color)', 'var(--color-basic-600)'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories,
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        theme: 'dark',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: 40,
      },
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
