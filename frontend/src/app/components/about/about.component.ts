import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Banner About -->
    <section class="bg-success py-5">
        <div class="container">
            <div class="row align-items-center py-5">
                <div class="col-md-8 text-white">
                    <h1>Sobre nosotros</h1>
                    <p>
                       Nos enorgullece poder compartir el legado artístico de nuestro fundador y contribuir a la preservación de este noble oficio. <br>

                       Somos una página dedicada a la venta de diseños de lápidas los cuales han sido diseñados a lo largo 
                       de la carrera profesional de un marmolista experimentado en el sector.
                    </p>
                </div>
                <div class="col-md-4">
                    <img src="./assets/img/anuncio.gif" alt="Vídeo marmolista trabajando" class="img-fluid">
                </div>
            </div>
        </div>
    </section>

    <!-- Content Section -->
    <div class="container">
        <div class="row align-items-center py-5">
            <div class="col-md-4">
                <img src="./assets/img/diseñoAlapida.jpg" alt="Paso de diseño corel a lápida" class="img-fluid">
            </div>
            <div class="col-md-8 texto2">
                <p>
                    En esta web encontrarás diseños exclusivos de lápidas pensados para marmolistas. No vendemos productos físicos, sino archivos digitales listos para el grabado. Cada diseño ha sido creado por un experto en el sector y está optimizado para ser usado directamente en piedra.
                <br>
                    Si eres marmolista, aquí encontrarás diseños profesionales que te ahorrarán tiempo y asegurarán un acabado elegante y solemne en tus trabajos.
                </p>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

} 