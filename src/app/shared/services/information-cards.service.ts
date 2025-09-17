import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InformationCard } from '../models/information-card';

@Injectable({
  providedIn: 'root'
})
export class InformationCardsService {
  private informationCards: InformationCard[] = [
    {
      id: 'derechos-usuario',
      path: 'derechos',
      title: 'Derechos del usuario en Salud Bolívar IPS',
      breadcrumbTitle: 'Derechos del usuario',
      cardImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/guia-para-el-usuario/178b8039-deb_10b907i07i07i01v000028.jpg',
      description: 'Conozca sus derechos como usuario de nuestros servicios de salud.',
      routerLink: '/guia-para-el-usuario/derechos',
      detailTitle: 'Derechos del paciente en Salud Bolívar IPS',
      detailDescription: 'Aquí encontrará todo lo que debe tener en cuenta para hacer un buen uso de su IPS.',
      backgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/derechos/14d87555-derechos_100000007s0ai00000f000.png',
      contentItems: [
        { id: 'recibir-atencion-medica', number: 1, text: 'Recibir atención médica oportuna, con calidez y escoger al profesional que lo atenderá, de acuerdo con la disponibilidad en la unidad de atención médica.' },
        { id: 'recibir-explicaciones-completas', number: 2, text: 'Recibir explicaciones completas, claras y entendibles acerca de su estado de salud y ser educado para mejorar las condiciones de salud con su autocuidado.' },
        { id: 'ser-informado-del-propósito', number: 3, text: 'Ser informado del propósito y recomendaciones de los exámenes, tratamientos o procedimientos a realizar, y de las consecuencias que tendría de no dar su consentimiento.' },
        { id: 'obtener-segunda-opinion', number: 4, text: 'A obtener una segunda opinión de un profesional de la salud adscrito a la unidad de atención médica, cuando se demuestre que la atención no fue resolutiva de acuerdo a la patología del paciente.' },
        { id: 'recibir-explicaciones-de-costos', number: 5, text: 'Recibir explicaciones de los costos por los servicios prestados.' },
        { id: 'participar-en-instancias-de-deliberacion', number: 6, text: 'A participar en las instancias de deliberación, veeduría y seguimiento del sistema.' },
        { id: 'participar-en-decisiones-de-tratamientos', number: 7, text: 'Participar en decisiones de tratamientos o procedimientos a seguir ordenados por su médico tratante y solicitar aclarar las dudas que tenga acerca de su condición médica.' },
        { id: 'informacion-confidencial', number: 8, text: 'A que toda la información relacionada con sus datos e historia clínica sean tratados de manera confidencial y solo con su autorización puedan ser conocidos.' },
        { id: 'tratado-respetuoso', number: 9, text: 'Ser tratado respetuosa y dignamente, independiente de su condición física, religiosa, social, económica y cultural.' },
        { id: 'espacios-seguros', number: 10, text: 'Ser atendidos en espacios seguros, con privacidad y comodidad.' },
        { id: 'recibir-informacion-sobre-canales-formales', number: 11, text: 'Recibir información sobre los canales formales presentar reclamaciones, quejas sugerencias y la forma de comunicarse con la administración de las unidades de atención médica, así como también de recibir respuesta verbal o escrita según el caso y de manera oportuna.' },
        { id: 'recibir-apoyo-emocional-y-moral', number: 12, text: 'Recibir apoyo emocional y moral o rehusar a él.' }
      ]
    },
    {
      id: 'deberes-usuario',
      path: 'deberes',
      title: 'Deberes del usuario en Salud Bolívar IPS',
      breadcrumbTitle: 'Deberes del usuario',
      cardImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/guia-para-el-usuario/c0a05c7d-db_10cs08j07i07i002009028.jpg',
      description: 'Conozca sus responsabilidades como usuario de nuestros servicios.',
      routerLink: '/guia-para-el-usuario/deberes',
      detailTitle: 'Deberes del usuario en Salud Bolívar IPS',
      detailDescription: 'Aquí encontrará todo lo que debe tener en cuenta para hacer un buen uso de su IPS.',
      backgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/deberes/fb069948-deberes_108b0go000000000000028.jpg',
      contentItems: [
        { id: 'ser-puntual', number: 1, text: 'Ser puntual, llegando 15 minutos antes de la hora asignada para su cita y en caso de no poder asistir, cancelar con 6 horas de anticipación.' },
        { id: 'presentar-identificacion', number: 2, text: 'Presentar en el área de admisión su documento de identidad y las órdenes médicas o autorizaciones necesarias para su atención.' },
        { id: 'cancelar-deducibles', number: 3, text: 'Cancelar los deducibles, cuotas moderadoras o copagos para los servicios que corresponda.' },
        { id: 'suministrar-informacion', number: 4, text: 'Suministrar información veraz, clara, oportuna y completa de su estado de salud.' },
        { id: 'seguir-tratamiento', number: 5, text: 'Seguir el tratamiento, cuidados y recomendaciones dados por los profesionales de salud.' },
        { id: 'procurar-cuidado', number: 6, text: 'Procurar en forma permanente, por el cuidado de la salud personal y de su familia y de promover el mantenimiento de las adecuadas condiciones de salud.' },
        { id: 'tratar-dignidad', number: 7, text: 'Tratar con dignidad y respeto al personal que lo atiende en la unidad de atención médica.' },
        { id: 'cuidar-recursos', number: 8, text: 'Cuidar y hacer uso racional de los recursos de la unidad de atención médica, cumpliendo con las políticas e instrucciones.' },
        { id: 'manifestar-sugerencias', number: 9, text: 'Manifestar sus sugerencias, reclamos, quejas y felicitaciones por el servicio brindado y expresar sus ideas para mejorar.' },
        { id: 'abstenerse-sustancias', number: 10, text: 'Abstenerse de acudir a recibir la atención de salud, bajo el estado de sustancias alucinógenas o de alicoramiento; así mismo está prohibido fumar e ingresar mascotas y/o armas de fuego a las instalaciones de la unidad de atención médica.' },
        { id: 'acompañamiento-adulto', number: 11, text: 'Tener el acompañamiento de un adulto en la atención para los pacientes menores de 14 años, así como también para los pacientes discapacitados y adultos mayores.' }
      ]
    },
    {
      id: 'asociacion-usuarios',
      path: 'asociacion',
      title: 'Asociación de usuarios y participación social',
      breadcrumbTitle: 'Participación Social',
      cardImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/guia-para-el-usuario/91b65652-convocatoria_10iq07i07i07i08z000028.jpg',
      description: 'Participe activamente en la mejora de nuestros servicios de salud.',
      routerLink: '/guia-para-el-usuario/asociacion',
      detailTitle: 'Participación Social',
      detailDescription: '¡La salud somos todos!',
      detailContent: 'Recuerde que a través de los buzones de sugerencias que encontrará en las unidades de Salud Bolívar IPS podrá darnos a conocer todas las peticiones, quejas, reclamos, sugerencias o felicitaciones que nos quiera compartir. La participación de nuestros usuarios, aporta al cumplimiento de la política de participación social en salud y al mantenimiento de atenciones en salud caracterizadas por su calidad y humanización del servicio.',
      backgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/asociacion/91b65652-convocatoria_1000000000000000000028.jpg',
      contentItems: []
    }
  ];

  /**
   * Obtiene todas las tarjetas de información
   * @returns Observable con todas las tarjetas de información
   */
  getAllInformationCards(): Observable<InformationCard[]> {
    return of(this.informationCards);
  }

  /**
   * Obtiene una tarjeta de información específica por su path
   * @param path - El path de la tarjeta a buscar
   * @returns Observable con la tarjeta encontrada o undefined si no existe
   */
  getInformationCardByPath(path: string): Observable<InformationCard | undefined> {
    const card = this.informationCards.find(card => card.path === path);
    return of(card);
  }

  /**
   * Obtiene una tarjeta de información específica por su ID
   * @param id - El ID de la tarjeta a buscar
   * @returns Observable con la tarjeta encontrada o undefined si no existe
   */
  getInformationCardById(id: string): Observable<InformationCard | undefined> {
    const card = this.informationCards.find(card => card.id === id);
    return of(card);
  }
}
