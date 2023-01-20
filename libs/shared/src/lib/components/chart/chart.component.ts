import {NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  standalone: true,
  selector: 'lib-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  imports: [NgApexchartsModule, NgIf],
})
export class ChartComponent {
  @Input() options: Partial<ChartOptions>;
}
