import { Component } from '@angular/core';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-weather-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.css'
})
export class WeatherAppComponent {
        cityName: string = 'Pune';
        weatherData: any;
        iconUrl: string = '';
        currentDate: string = '';
        loading: boolean = false;
        error: string ='';

        private url = 'https://api.openweathermap.org/data/2.5/weather';
        private apiKey = '651bf9678a5ab64e494277c2369e8c5c';

        constructor(private http: HttpClient) { }

        ngOnInit(): void{
          this.getWeather();
        }

        getWeather(): void {
          this.loading = true;
          this.error = ' ';
          const fullUrl = `${this.url}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;
          this.http.get(fullUrl).subscribe(
            (data: any) => {
              this.weatherData = data;
             this.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                this.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
                document.getElementById('weather-info')?.style.setProperty('display', 'block');
                this.loading = false;
            },
            (error) => {
                this.error = 'City not found. Please try again.';
                this.loading = false;
                console.error('Error fetching weather data:', error);
            }
          )
        }

}
