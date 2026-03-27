<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <section>
   <head>
  <title>Fvl 2026</title>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width">

   </head>
   <div v-if="loading" class="loading">
   <loading-page></loading-page>
   </div>
       <section
      class="home"
       style="background-color:blue;overflow:hidden;position:relative"
       >
         <div class="banner-back"
         style="filter:blur(30px);transform: scale(1.2);
         position: fixed;z-index:0;">
               <banner-background></banner-background>
               </div>
               <div class ="fixed-list">
               <div class="dropdown">
                 <button class="dropbtn" @click="change_zh">繁中</button>
               </div>

               <div class="contact_us">
               </div>
              </div>

              <div class="banner-box">
               <div class="banner">
                 <div class="banner-img">
                  <!-- <img src="../assets/fvl-logo.png" style="position:absolute;bottom:5%;z-index: 3;left:5%;width:10%;"> -->
                  <img src="../assets/l-img.png" style="position:absolute;bottom:5%;z-index: 3;left:5%;width:10%;">
                  <img src="../assets/2024banner.png" style="position: absolute;bottom: 0;width: 100vw;z-index:2;" >
                  <div class="pulse">
                   <span style="--i:0;"></span>
                   <span style="--i:1;"></span>
                   <span style="--i:2;"></span>
                   <span style="--i:3;"></span>
                   <span style="--i:4;"></span>
                   <span style="--i:5;"></span>
                   <span style="--i:6;"></span>
                  </div>
                 </div>
               </div>
               <div id="title-img">
                  <!-- <img src="../assets/fvl_title1.png"> -->
                  <img src="../assets/t-img.png">
                </div>
               <div id="date-img" >
                  <img src="../assets/d-img.png">
               </div>
             </div>


             <div class="about-background" style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
                  <div class="fvl_about">
                     <div class="about_fvl">
                        <p>Since its launch in 2020, C-LAB Future Vision Lab has consistently developed FUTURE VISION LAB, an experimental exhibition and performance project that engages in building a digital, experimental architectural site in a dome shape with its vision of exploring the visual limits of technology media. In 2023, with the support of the Ministry of Culture, it is able to expand and upgrade to “FVL DOME”. In terms of size, it is built as a movable DOME with a diameter of 15 meters. The audio-visual hardware and software have undergone several iterations, overcoming the image warping, calibration, mapping, play control, and video pre-production. The immersive image projection system achieves a total resolution of up to 8K*8K. Internally, a double-layer structure conceals the equipment, and a new-type of acoustically transparent projection membrane custom-made according to extensive discussions with the industry sector. In collaboration with Taiwan Sound Lab, a more refined sound field environment has been constructed, enhancing the system to a 25.4-channel immersive surround sound system. In the future, the Future Vision Lab will continue to develop immersive dome environments to meet international standards, showcasing Taiwan’s energetic creativity and providing audiences with a superior immersive sensory experience.</p>
                        <p></p>The "FUTURE VISION LAB 2024" is held from November 1st to December 22nd this year. Over eight consecutive weekends, it presents works from Australia, Bosnia and Herzegovina, China, Germany, Japan, South Korea and Taiwan. The event features a total of 15 programs and 3 lectures and workshops. Additionally, the Future Vision Lab is actively collaborating with domestic and international organizations to present exhibitions, screenings, and live performances in various formats. This provides an opportunity to experience the latest creative content in the dome space and immerse oneself in the sensory experiences.
                  </div>
                </div>

      <div class="fvl_tickets">
          <div class="exibition_info">
               <div class="sales_info">
                   <div class="about_event" >
                     <br>
                     <div class="title_background" > <p style="font-weight: 700;margin-bottom:0 !important;">location</p></div>
                          <div class = "location">
                         <p>FVL Dome (C-LAB East Lawn)<br>No. 177, Sec. 1, Jianguo S. Rd., Da'an Dist., Taipei City, Taiwan</p>
                     </div>
                     <br>
                   </div>
                   <div class="google-map" id="map"></div>
               </div>


               <div class="title_background" style="width: auto;"> <p style="font-weight: 700;margin-bottom:0 !important;padding:10px;">Admission Information</p></div>
               <div class="tickets">
                   <div class="ticket_buttons">
                       <button type="button" class="early-bird" :class="{'active':link == 'early-bird'}" v-on:click.prevent="link = 'early-bird'"><p style="font-size:1em;margin-bottom: 0 !important;">Screening & Live Performance</p></button>
                       <button type="button" class="pre-sale" :class="{'active':link == 'pre-sale'}" v-on:click.prevent="link = 'pre-sale'" @click="plus()"><p style="font-size:1em;margin-bottom: 0 !important;">Exhibition</p></button>
                   </div>


                   <div class="tickets_info" >
                        <div v-if="link == 'early-bird'" >
                          <div class="notice">
                            <div class="sales-enter-animate" style="width:100%;">
                              <p><b> ▶ </b> Ticket required for entry. One person, one ticket admission. <br>
                           <b> ▶ </b> Please arrive at least 10 minutes before the performance or screening. Latecomers will not be admitted. <br>
                           <b> ▶ </b>   Throughout the festival, <u style="color: #fe225b;">tickets for each program will be available on the Monday two weeks before the event date</u>. For detailed program registration information, please visit the <a href="https://www.facebook.com/profile.php?id=100079147550663"  style="color:blue;font-weight: 600;">"C-LAB Technology Media Platform" Facebook  page </a>or the <a href="https://www.accupass.com/organizer/detail/1807130939251014675956" style="color:blue;font-weight: 600;">event page of C-LAB on Accupass.</a><br>
                           <b> ▶ </b>  For detailed program information, please visit FUTURE VISION LAB official website:<a href="https://fvl.clab.org.tw/fvl-fest-2024/" style="color:blue;font-weight: 600;"> https://fvl.clab.org.tw/fvl-fest-2024/  </a><br>
                           </p>
                           </div>
                          </div>
                          <hr style='background-color:black;height:0.1px; border:none;opacity: 0.5;'>
                          <div class="notice">
                            <p style="font-size:1.2rem;font-weight:bolder;color: black;width:100%;padding:0;margin-bottom:1rem;"> Notice</p>
                           <p><b>◉</b>  Some performances contain intense strobe lighting effects. Viewer discretion is advised.<br>
                            <b>◉</b> Due to the mirror floor in the venue, wearing "pants" for your visit is recommended.<br>
                            <b>◉</b>   Due to limited space inside the venue, picnic mats and chairs are not allowed. If you have other needs, please contact the staff for assistance.<br>
                            <b>◉</b> Photography and reels recording are allowed during the screening, but the use of flash is prohibited.<br>
                            <b>◉</b> Programs may be subject to change.</p>
                           </div>
                          </div>


                          <div v-if="link == 'pre-sale'" >
                          <div class="notice">
                            <div class="sales-enter-animate" style="width:100% ;">
                              <p>Exhibition works include: Nov. 2 “FUTURE VISION LAB 2024 - Works Screening”<br> Nov. 23-24 “Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems”<br> Dec. 13-15 “C-LAB Future Vision Lab’s latest production”. </p><br>
                              <p><b> ▶ </b> Entry will be granted in order of on-site queue until capacity is reached.<br>
                              <b> ▶ </b>The maximum capacity is 100 people. If the venue is full, please wait for audiences exiting before entering according to the capacity control. <br>
                              <b> ▶ </b> If individuals in the queue are not present when entry opens, they will be considered to have forfeited their places and must rejoin the line in order to wait for entry.
                              </p>
                           </div>
                          </div>
                            <hr style='background-color:black;height:0.1px; border:none;opacity: 0.5;'>
                            <div class="notice">
                            <p style="font-size:1.2rem;font-weight:bolder;color: black;width:100%;padding:0;margin-bottom:1rem;">Notice</p>
                           <p><b>◉</b>    Some performances contain intense strobe lighting effects. Viewer discretion is advised.<br>
                            <b>◉</b>  Due to the mirror floor in the venue, wearing "pants" for your visit is recommended.<br>
                            <b>◉</b>   Due to limited space inside the venue, picnic mats and chairs are not allowed. If you have other needs, please contact the staff for assistance.<br>
                            <b>◉</b>  Photography and reels recording are allowed during the screening, but the use of flash is prohibited.<br>
                            <b>◉</b>  Programs may be subject to change.</p>
                           </div>
                          </div>
                   </div>
               </div>
            </div>
          </div>

         </div>
           <div class="program-list">
            <div class="title_background"> <p style="font-weight: 700;margin-bottom:0 !important;">Program</p></div>
                       <!-- <div class="tickets_en" style="text-transform: uppercase;color:#ff8c9f;font-size:10vw;font-family:Impact, fantasy;">Program</div> -->
                        <!-- <img src="imgs/list.jpg" style="margin-top: 1rem;border-radius: 25px;padding:2rem;background-color: white;"> -->
                 <!-- 10月 -->
                  <!-- //// -->

                  <!-- 10月本週 -->
                  <div class="table" v-if="ShowOctoberweek">
                    <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                   <tr>
                    <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                   </tr>
                  <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">10/22(Tue.)</th>
                   <td scope="col" style="vertical-align:middle; white-space:nowrap;">19:00</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;width: 100%;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part I</td>
                  </tr>
                 <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">10/25(Fri.)</th>
                   <td scope="col" style="vertical-align:middle;white-space:nowrap;">13:30、17:30</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;border-end-end-radius: 25px;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part II</td>
                 </tr>
                 </table>
                  </div>
                  <!-- //////// -->
                     <!-- 11月第一週 -->
                 <div class="table" v-if="ShowNovemberfirstweek && ShowOctober">
                  <table style="width:100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">11/2(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-22:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                              FUTURE VISION LAB 2024 - Works Screening<br><p style="color:orange;background-color:transparent;">*In support of the "Nuit Blanche Taipei", the opening time is extended</p></td>
                           </tr>
                           <!-- 11/3 -->
                           <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">11/3(Sun.)</th>
                           </tr>
                           <tr style="">
                             <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins<br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                             Ina CHEN x Calvin SIN x LU Te-Hsing<br>｜4993 Feet Under ｜15 mins<br> Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>

                           </tr>
                         <!-- </tr> -->
                          </table>
                     </div>
                      <!-- /////// -->
                  <div class="table" v-if="ShowOctober">
                    <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                   <tr>
                     <td colspan="4" style=" border: none;border-top-left-radius:25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Oct.</td>
                   </tr>
                  <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">10/22(Tue.)</th>
                   <td scope="col" style="vertical-align:middle;  white-space:nowrap;">19:00</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;width: 100%;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part I</td>
                  </tr>
                 <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">10/25(Fri.)</th>
                   <td scope="col" style="vertical-align:middle;  white-space:nowrap;">13:30、17:30</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part II</td>
                 </tr>
                </table>
                  </div>

                  <div class="table"  v-if="ShowOctober">
                    <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Nov.</td>
                          </tr>
                          <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">11/2(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-22:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                              FUTURE VISION LAB 2024 - Works Screening<br><p style="color:orange;background-color:transparent;">*In support of the "Nuit Blanche Taipei", the opening time is extended</p>
                            </td>
                          </tr>
                          <!-- 11/3 -->
                          <tr>
                            <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/3(Sun.)</th>
                          </tr>
                             <tr>
                              <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome| 9 mins <br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21 mins </td>
                             </tr>
                             <tr>
                              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing ｜15 mins<br>｜4993 Feet Under <br>Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins </td>
                             </tr>
                             <tr>
                              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho  x Yuchi HSIAO｜Demo: Dome｜9 mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura ｜27 mins</td>
                             </tr>
                             <tr>
                              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopi｜ 21 mins</td>
                             </tr>
                           <!-- </tr> -->
                      <!-- 11/10 -->
                        <tr>
                          <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/10(Sun.)</th>
                        </tr>
                            <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                             <td style="vertical-align:middle;text-align: left;">
                             Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins <br> Murthovic & Thiruda｜Elsewhere in India: Odyssey ｜15 mins</td>
                        </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins <br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia ｜ 21 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜15 mins <br>Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins </td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;"> CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins<br> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins</td>

                           <!-- </tr> -->
                         </tr>


                           <!-- 11/15 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/15(Fri.)</th>
                           </tr>


                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:30</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP (Live Performance)｜40 mins</td>

                           <!-- </tr> -->

                           </tr>

                           <!-- 11/16 -->
                           <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color:white;">11/16(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation)｜15 mins </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins <br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation)｜15 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia ｜ 21 mins<br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation)｜15 mins </td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins <br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation)｜15 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP (Live Performance)｜40 mins</td>
                           </tr>
                         <!-- </tr> -->
                         <!-- 11/17 -->
                         <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/17(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Unboxing DOME- Artist’s Talk #1｜Ina CHEN, Calvin SIN, LU Te-Hsing, Sergey PROKOFYEV, WU Ke-Jyun, Warrick TSAI (Moderator) </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:15</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Unboxing DOME- Artist’s Talk #1｜CHUANG Ho, HSIAO Li-Chi, WU Ping-Sheng, Warrick TSAI (Moderator) </td>

                           </tr>

                           <!-- </tr> -->

                           <!-- 11/22 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                          </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;"> Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins </td>
                             </tr>
                           <!-- </tr> -->

                           <!-- 11/23 -->
                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/23(Sat.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins </td>
                               </tr>
                           <!-- </tr> -->

                           <!-- 11/24 -->

                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/24(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins </td>
                               </tr>
                           <!-- </tr> -->
                                 <!-- 11/29 -->

                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/29(Fri.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">20:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                               </tr>
                           <!-- </tr> -->
                                    <!-- 11/30 -->
                            <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">11/30(Sat.)</th>
                            </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                               </tr>

                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins </td>
                               </tr>
                              </table>
                           <!-- </tr> -->
                     </div>


                  <div class="table"  v-if="ShowOctober">
                    <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Dec.</td>
                          </tr>

                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/1(Sun.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>

                           </tr>

                           <!-- </tr> -->

                           <!-- 12/6 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/6(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;"> C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins</td>
                           </tr>

                         <!-- 12/7 -->
                         <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/7(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>
                           <!-- 12/13 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/13(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-20:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> C-LAB Future Vision Lab’s latest production </td>
                           </tr>
                           <!-- 12/14 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/14(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">12:00-19:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> C-LAB Future Vision Lab’s latest production  </td>
                           </tr>
                         <!-- 12/15 -->
                          <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color: blue;color: white;">12/15(Sun.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">12:00-19:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB Future Vision Lab’s latest production  </td>
                           </tr>

                           <!-- 12/21 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/21(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods</td>
                               </tr>
                           <!-- </tr> -->

                           <!-- 12/22 -->
                          <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">12/22(Sun.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
                                  <td style="vertical-align:middle;text-align: left;">  Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
                                 <td style="vertical-align:middle;text-align: left;">  Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University ｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins  </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;">  Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins</td>
                               </tr>
                           <!-- </tr>  -->
                              </table>
                     </div>
                 <!-- 11月第一週 -->
                 <div class="table" v-if="ShowNovemberfirstweek && ShowNovember">
                  <table style="width:100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>

                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">11/2(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-22:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                              FUTURE VISION LAB 2024 - Works Screening<br><p style="color:orange;background-color:transparent;">*In support of the "Nuit Blanche Taipei", the opening time is extended</p></td>
                           </tr>

                           <!-- 11/3 -->
                           <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">11/3(Sun.)</th>
                           </tr>
                           <tr style="">
                             <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins<br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                             Ina CHEN x Calvin SIN x LU Te-Hsing<br>｜4993 Feet Under ｜15 mins<br> Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>

                           </tr>
                         <!-- </tr> -->
                          </table>
                     </div>
                      <!-- /////// -->
                                   <!-- 11月第二週 -->
                      <div class="table"  v-if="ShowNovembersecondweek">
                        <table style="width:100%; border-collapse:collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>

                         <!-- 11/10 -->
                         <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom: none;">11/10(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                             <td style="vertical-align:middle;text-align: left;">
                             Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins <br>Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome ｜9 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins </td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜15 mins <br> Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
                             <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins </td>

                           </tr>
                         <!-- </tr> -->
                          </table>
                     </div>
                     <!-- ////// -->
                                           <!-- 第三週 -->

                      <div class="table"  v-if="ShowNovemberthirdweek">
                        <table style="width:100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>

                         <!-- 11/15 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/15(Fri.)</th>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP (Live Performance) | 40mins</td>
                           </tr>
                           <!-- </tr> -->

                           <!-- 11/16 -->
                           <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/16(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21 mins </td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening) | 15mins<br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">C-LAB x Critical Path｜BODY.DATA.LOOP | 40mins</td>

                           </tr>
                         <!-- </tr> -->
                         <!-- 11/17 -->
                         <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;">11/17(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins <br> CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins <br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:30</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">Unboxing DOME- Artist’s Talk #1｜CHUANG Ho, HSIAO Li-Chi, WU Ping-Sheng, WU Ke-Jyun, Warrick TSAI (Moderator) </td>
                           </tr>
                       </table>
                           <!-- </tr> -->
                     </div>
                           <!-- ////////// -->
                                           <!-- 第四週 -->
                 <div class="table"  v-if="ShowNovemberfourthweek">
                  <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>

                           <!-- 11/22 -->
                           <!-- <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                           </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) ｜60 mins </td>
                             </tr> -->
                           <!-- </tr> -->

                           <!-- 11/23 -->
                          <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-start-end-radius:25px;border-bottom:none;">11/23(Sat.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9 mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15 mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21 mins <br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9 mins<br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27 mins</td>
                               </tr>

                           <!-- 11/24 -->

                           <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color:white;">11/24(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening) | 15mins <br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins <br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>
                           <!-- </tr> -->
                              </table>
                     </div>

                     <!-- ///////// -->
                      <!-- 第五週 -->
                     <!-- 11月 -->
                 <div class="table"  v-if="ShowNovemberfifthweek || ShowDecemberfirstday">
                  <table style="width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius:25px;border-top-right-radius:25px;padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>
                                 <!-- 11/29 -->
<!--
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/29(Fri.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">20:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                               </tr> -->
                           <!-- </tr> -->
                                    <!-- 11/30 -->
                               <tr>
                                <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/30(Sun.)</th>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>
                              <tr>
                               <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;">12/1(Sun.)</th>
                              </tr>
                              <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
                               <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                              </tr>
                              <tr>
                               <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
                               <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);border-end-end-radius:25px;border-bottom:none;">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                           </tr>


                               <!-- <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;background-color:rgb(231 255 255);"> WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                               </tr> -->
                           <!-- </tr> -->
                              </table>
                     </div>

                     <!-- ///////// -->

                     <!-- 11月顯示全部節目 -->
                     <div class="table" v-if="ShowNovember">
                      <table style="width:100%; border-collapse: collapse !important;margin:0;">
                   <tr>
                     <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Oct.</td>
                   </tr>


                  <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">10/22(Tue.)</th>
                   <td scope="col" style="vertical-align:middle;  white-space:nowrap;">19:00</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;width: 100%;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part I</td>
                  </tr>


                 <tr>
                   <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;">10/25(Fri.)</th>
                   <td scope="col" style="vertical-align:middle;  white-space:nowrap;">13:30、17:30</td>
                   <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;">Revlis HUANG｜Dome immersive video workshop via TouchDesigner- Part II</td>
                 </tr>
                </table>
                  </div>

                     <div class="table"  v-if="ShowNovember">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Nov.</td>
                          </tr>

                           <!-- <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">11/2(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-22:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                              FUTURE VISION LAB 2024 - Works Screening<br><p style="color:orange;background-color:transparent;">*In support of the "Nuit Blanche Taipei", the opening time is extended</p></td>
                           </tr> -->

                           <!-- 11/3 -->
                           <!-- <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/3(Sun.)</th>
                           </tr>
                           <tr>
                             <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome 9 mins<br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">
                             Ina CHEN x Calvin SIN x LU Te-Hsing｜15 mins<br>｜4993 Feet Under <br>Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins </td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome ｜9 mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>
                           </tr> -->
                         <!-- 11/10 -->
                         <!-- <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/10(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                             <td style="vertical-align:middle;text-align: left;">
                             Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins <br>Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHUANG Ho｜Demo: Dome｜8 mins <br> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜15 mins <br> Murthovic & Thiruda｜Elsewhere in India: Odyssey｜15 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins </td>
                           </tr> -->
                           <!-- 11/15 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/15(Fri.)</th>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP (Live Performance)｜40 mins</td>
                           </tr>

                           <!-- </tr> -->
                           <!-- 11/16 -->
                           <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/16(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜ 9 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜21 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜ 15 mins<br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9mins<br> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP｜40 mins</td>
                           </tr>
                         <!-- 11/17 -->
                         <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color:white;">11/17(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome| 9mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                           </tr>
                                   <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:30</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Unboxing DOME- Artist’s Talk #1｜CHUANG Ho, HSIAO Li-Chi, WU Ping-Sheng, WU Ke-Jyun, Warrick TSAI (Moderator) </td>
                           </tr>
                           <!-- </tr> -->
                           <!-- 11/22 -->
                           <!-- <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                           </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) ｜60 mins </td>
                             </tr> -->
                           <!-- </tr> -->

                           <!-- 11/23 -->
                          <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/23(Sat.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>
                           <!-- </tr> -->

                           <!-- 11/24 -->
                           <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/24(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening) | 15mins <br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>
                                 <!-- 11/29 -->
<!--
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/29(Fri.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">20:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins </td>
                               </tr> -->
                           <!-- </tr> -->
                                    <!-- 11/30 -->
                             <tr>
                                 <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;">11/30(Sat.)</th>
                            </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border:none;">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>
<!--
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);"> WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                               </tr> -->
                           <!-- </tr> -->
                              </table>
                     </div>


                     <div class="table"  v-if="ShowNovember">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Dec.</td>
                          </tr>

                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/1(Sun.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>

                           </tr>
                           <!-- </tr> -->
                           <!-- 12/6 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/6(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>

                         <!-- 12/7 -->
                         <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/7(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>
                              <!-- 12/11 -->
                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/11(Wed.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance) | 25mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">20:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜ 25mins</td>
                           </tr>

                                  <!-- 12/12 -->
                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/12(Thu.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance) | 25mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">20:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜ 25mins</td>
                           </tr>
                           <!-- 12/13 -->
                           <!-- <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/13(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-20:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB Future Vision Lab’s latest production </td>
                           </tr> -->
                           <!-- 12/14 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/14(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00-20:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">To be announced</td>
                           </tr>
                         <!-- 12/15 -->
                          <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color: blue;color: white;">12/15(Sun.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00-19:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">To be announced</td>
                           </tr>

                           <!-- 12/21 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;">12/21(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>
                           <!-- 12/22 -->
                          <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/22(Sun.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
                                 <td style="vertical-align:middle;text-align: left;">Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
                                 <td style="vertical-align:middle;text-align: left;border-end-end-radius: 25px;">  Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins</td>
                               </tr>
                        <!-- 12/27 -->
                        <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color: blue;color: white;">12/27(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                           </tr>
                           <!-- 12/28 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;">12/28(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                               </tr>
                       <!-- 12/29 -->
                       <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;">12/29(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;border-end-end-radius:25px;border-bottom:none;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                               </tr>
                              </table>
                     </div>
                     <!-- /////////// -->

                     <!-- 12月Dec -->

                     <!-- //////////// -->

                      <!-- 12月第一週 -->
                <div class="table"  v-if="ShowDecemberfirstweek">
                  <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>

                          <!-- <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/1(Sun.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                           </tr> -->

                           <!-- 12/6 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/6(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>
                                    <!-- 12/7 -->
                         <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;">12/7(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;border-end-end-radius: 25px;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins</td>
                           </tr>
                          </table>
                     </div>
                     <!-- ////////////// -->
                                        <!-- 第二週 -->
                     <div class="table"  v-if="ShowDecembersecondweek">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>
               <!-- 12/12 -->
               <tr>
                             <th rowspan="3" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/12(Thu.)</th>
                             </tr>
                             <tr>
                            <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                           </tr>
                           <tr>
                            <td scope="col" style="vertical-align:middle;white-space:nowrap;">20:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜25 mins</td>
                           </tr>
                           <!-- 12/14 -->
                           <tr>
                             <th rowspan="7" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/14(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Unboxing DOME- Artist’s Talk #2｜Ina CHEN, Calvin SIN, LU Te-Hsing, Sergey PROKOFYEV, Warrick TSAI (Moderator)
                             </td>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins
                             </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME(Screening) ｜15 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>C-LAB Future Vision Lab's Latest Work ｜8 mins</td>
                           </tr>

                         <!-- 12/15 -->
                         <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom: none;">12/15(Sun.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins<br>C-LAB Future Vision Lab's Latest Work
                              ｜8 mins
                             </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜15 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins<br>C-LAB Future Vision Lab's Latest Worka｜8 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius: 25px;border-bottom: none;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins</td>
                           </tr>
                          </table>
                     </div>
                  <!-- ////////////// -->
                                      <!-- 第三週 -->

                     <div class="table"  v-if="ShowDecemberthirdweek">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                            <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">This week</td>
                          </tr>
                           <!-- 12/21 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;">12/21(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>
                           <!-- 12/22 -->
                          <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;">12/22(Sun.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins  </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
                                 <td style="vertical-align:middle;text-align: left;">Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins  </td>
                               </tr>

                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins  </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;">Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins  </td>
                               </tr>
                              </table>
                     </div>

                    <!-- ////////////// -->
                     <!-- 第四週 -->
                     <div class="table"  v-if="ShowDecemberfourthweek">
                        <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                            <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">本週節目</td>
                          </tr>
                           <!-- 12/27 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/27(Fri.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
                                  <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins</td>
                               </tr>
                           <!-- 12/28 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-bottom:none;">12/28 (Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:30</td>
                                  <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins</td>
                               </tr>
                             <!-- 12/29 -->
                             <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;">12/29 (Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:30</td>
                                  <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;border-end-end-radius:25px;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance)｜60 mins</td>
                               </tr>
                          </table>
                     </div>

                     <div class="table"  v-if="ShowDecember">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Nov.</td>
                          </tr>
                     <!-- 11/15 -->
                           <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/15(Fri.)</th>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP (Live Performance)｜40 mins</td>
                           </tr>

                           <!-- </tr> -->
                           <!-- 11/16 -->
                           <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/16(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜ 9 mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜21 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜ 15 mins<br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9mins<br> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x Critical Path｜BODY.DATA.LOOP｜40 mins</td>
                           </tr>
                         <!-- 11/17 -->
                         <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/17(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">CHUANG Ho x Yuchi HSIAO｜Demo: Dome| 9mins<br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                           </tr>
                           <!-- </tr> -->
                           <!-- 11/22 -->
                           <!-- <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                           </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) ｜60 mins </td>
                             </tr> -->
                           <!-- </tr> -->

                           <!-- 11/23 -->
                          <tr>
                             <th rowspan="6" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/23(Sat.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins <br>CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Interactive installation) | 15mins</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>
                           <!-- </tr> -->

                           <!-- 11/24 -->
                           <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/24(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening) | 15mins <br>Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins</td>
                               </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under | 15mins<br>Sergey PROKOFYEV｜Local Dystopias in the Global Utopia | 21mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
                                 <td style="vertical-align:middle;text-align: left;">CHUANG Ho x Yuchi HSIAO｜Demo: Dome | 9mins <br>Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura | 27mins</td>
                               </tr>

                                    <!-- 11/30 -->
                             <tr>
                                 <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;">11/30(Sat.)</th>
                            </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border:none;">WU Cheng-Ru｜Dream Percept (Live Performance) | 15mins</td>
                               </tr>
<!--
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                 <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);"> WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                               </tr> -->
                           <!-- </tr> -->
                              </table>
                     </div>


                     <div class="table"  v-if="ShowDecember">
                      <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
                          <tr>
                             <td colspan="4" style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;">Dec.</td>
                          </tr>

                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/1(Sun.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">WU Cheng-Ru｜Dream Percept (Live Performance)｜15 mins</td>

                           </tr>
                           <!-- 12/6 -->
                           <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/6(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>

                         <!-- 12/7 -->
                         <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/7(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;">C-LAB x KAMS｜Future Vision Party #2 (Live Performance)｜60 mins </td>
                           </tr>
                              <!-- 12/11 -->
                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/11(Wed.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance) | 25mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">20:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜ 25mins</td>
                           </tr>

                                  <!-- 12/12 -->
                          <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/12(Thu.)</th>
                          </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance) | 25mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">20:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">HSIAO Li-Chi｜Resonance in the Virtual Realm (Live Performance)｜ 25mins</td>
                           </tr>
                           <!-- 12/14 -->
                           <tr>
                             <th rowspan="7" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/14(Sat.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Unboxing DOME- Artist’s Talk #2｜Ina CHEN, Calvin SIN, LU Te-Hsing, Sergey PROKOFYEV, Warrick TSAI (Moderator)
                             </td>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under ｜15 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins
                             </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening) ｜15 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins</td>
                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>C-LAB Future Vision Lab's Latest Work ｜8 mins</td>
                           </tr>


                         <!-- 12/15 -->
                         <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/15(Sun.)</th>
                           </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Kazuya NAGAYA x Ali Mahmut DEMIREL x Maurice JONES｜Iwakura｜27 mins<br>C-LAB Future Vision Lab's Latest Work
                              ｜8 mins
                             </td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> CHENG WEI-ZHI x BILLAIN x Jeffrey LIU｜Module IN DOME (Screening)｜15 mins<br>CHUANG Ho x Yuchi HSIAO｜Demo: Dome｜9 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> Sergey PROKOFYEV｜Local Dystopias in the Global Utopia｜ 21 mins<br>C-LAB Future Vision Lab's Latest Worka｜8 mins</td>


                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under｜15 mins<br>C-LAB Future Vision Lab's Latest Work｜8 mins</td>

                           </tr>

                           <!-- 12/21 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;">12/21(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
                                 <td style="vertical-align:middle;text-align: left;">Digital Art Foundation｜DOME of the Gods | 20mins</td>
                               </tr>
                           <!-- 12/22 -->
                          <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">12/22(Sun.)</th>
                          </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
                                  <td style="vertical-align:middle;text-align: left;"> Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins </td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
                                 <td style="vertical-align:middle;text-align: left;">  Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
                                  <td style="vertical-align:middle;text-align: left;">Immersive Audiovisual Workshop - The Joint Presentation: Interdisciplinary Program of Technology and Art, National Tsing Hua University｜60 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
                                 <td style="vertical-align:middle;text-align:left;border-end-end-radius: 25px;">  Immersive Audiovisual Workshop - The Joint Presentation: Department of Communications Design, Shih Chien University｜60 mins</td>
                               </tr>
                        <!-- 12/27 -->
                        <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color: blue;color: white;">12/27(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:30</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                           </tr>
                           <!-- 12/28 -->
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;">12/28(Sat.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align:left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:30</td>
                                 <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                               </tr>
                       <!-- 12/29 -->
                       <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;">12/29(Sun.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">12:00-18:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Exhibition)</td>
                               </tr>
                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">19:30</td>
                                 <td style="vertical-align:middle;text-align: left;border-end-end-radius:25px;border-bottom:none;background-color: rgb(231, 255, 255);">Aisthesis Savage｜Artificial Sun and Electro Asura - Artificial Abhijñā and Mechanical Body: Development Project for Large Language Models and Immersive Generation Systems (Live Performance) | 60mins</td>
                               </tr>
                              </table>
                     </div>
                     <!-- /////////// -->
               </div>


       <!--11月結束 ------------------------------------------------------------------------------------------------------------------------------------------------ -->
                  <!-- <section class="grids" style="width: 100vw;height: auto;background-color: blue;padding:4rem;"> -->
                        <div class="grid_title">
                            <div class="title_background">
                               <p style="margin-bottom: 0 !important;">works</p>
                            </div>
                            <div class="container" >
                              <div class="row grid max-margin" style="margin: 0 auto;justify-content: center;position: relative;">
                                  <!-- <div class="col-md-6 card mb-80" v-for="(item, index) in products" v-bind:key="index" v-on:click="chosework(index)"> -->
                                   <!-- <div class="col-md-6 card mb-80" v-for="(item, index) in products" v-bind:key="item.id" v-on:click="jump(item.id)">  -->
                                    <div class="col-md-6 card mb-80" v-for="(item, index) in  orderedProducts" v-bind:key="item.id">
                                        <div class="imagewrap">
                                           <div class="imagewrap-background"></div>
                                            <img :src ="'https://unzip-clab-api.clab.org.tw/'+item.photo_1" style="height:100%;width:100%;object-fit:cover;z-index:2;">
                                        </div>
                                      <div class="wordwrap">
                                      <router-link target="_blank" :to="{
                                            name:'Aboutwork_en',
                                            params:{
                                              id:index,
                                             workId:item.work_id,
                                            }
                                         }">
                                     <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                                       </router-link>
                                      </div>
                                      <div class="grid_title">
                               </div>

                           </div>
                        </div>
                    </div>

                        <!-- <div class="title_background" style="margin-top: 1em"> -->
                          <div class="title_background" style="margin-top:2em;width:auto !important;" > <p style="font-weight: 700;margin-bottom:0 !important;padding:5px;"> Credit List</p></div>
                           <!-- <p style="margin-bottom: 0 !important;color:white;text-align: left;margin-top: 6em;">製作團隊</p> -->
                        <!-- </div> -->
                        <div class="team">

                          <ul style="width:50%;">
                              <li>Project Principal - Warrick TSAI</li>
                              <li>Project Manager - Emma LIAO </li>
                              <li>Technical Director - Warrick TSAI </li>
                              <li>Technical Coordinator - AnDing KANG, Charles WANG</li>
                              <li>Technical Support - Max LIN</li>
                              <li>Preliminary Conceptual Design - JHStudio, Department of Architecture, National Yang Ming Chiao Tung University</li>
                              <li>Architectural Design and Fabrication - achy_made</li>
                              <li>Sound Field Design - HSIEH Hsien-Te (C-LAB Taiwan Sound Lab)</li>
                              <li>Sound System Coordination - BlackRice Studio</li>
                          </ul>

                          <ul style="width:50%">
                               <li>Opening Video Design - WU Ke-Jyun</li>
                               <li>Entry Video - Sumito SAKAKIBARA</li>
                               <li>Key Vision Design - Robert LIN</li>
                               <li>Website Design - LIN Han-Kuan</li>
                               <li>Photo Ducumentation - LIN Hsuan-Lang, ANPIS FOTO</li>
                               <li>Video Ducumentation - Cinemaruku Co., Ltd.</li>
                               <li>Trailer Editing - HUANG Chia-Wen</li>
                               <li>Translation - KAO Huei-Cian</li>
                          </ul>

                          </div>


                          <!-- <div class="logos" style="width:100%;margin-top:2em;color:white;position:relative;">
                            <img src="imgs/logos.png" style="position:relative;margin-bottom:2em;">
                          </div> -->

                       <!-- ---------logos test------------------->

                       <div class="logos">
                            <div class="Supervisor" style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;">
                             <img src="../assets/指導單位.svg">
                              <img src="../assets/文化部.svg">
                             </div>
                             <div class="Organizer" style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;">
                              <img src="../assets/主辦單位.svg" >
                              <img src="../assets/台灣當代文化實驗場.svg">
                             </div>
                             <div class="Executive" style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;">
                             <img src="../assets/執行單位.svg">
                             <img src="../assets/C-Lab科媒平台.svg">
                              </div>
                        </div>

                            <div class="Collaborator">
                             <img src="../assets/合作單位.svg" >
                             <img src="../assets/國美館.svg">
                             <img src="../assets/critical-path.svg">
                             <img src="../assets/知覺野人.svg">
                             <img src="../assets/koera-arts.svg">
                             <img src="../assets/財團法人藝術基金會.svg">
                             <img src="../assets/動畫基地.svg">
                             <img src="../assets/清華大學.svg">
                             <img src="../assets/實踐大學.svg">
                           </div>


                       <!-- ---------------------------------------------- -->

                        <div class="faq-container">
                             </div>

                        </div>
       <foot-bar2></foot-bar2>
 </section>

</section>
</template>

<script>
// import "../jquery.js";
import axios from 'axios';
import '../parallaxedEffect.js';
import {ThreeJs} from '../components';
// import { FootBar } from '../components';
import {InfoBar} from '../components';
import {gsap} from 'gsap';
import {Anibackground} from '../components';
import {BannerBackground} from '../components';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {TextPlugin} from 'gsap/dist/TextPlugin.js';
import {defineComponent} from 'vue';
import {NavBar2, FootBar2} from '../components';
import {Loading} from '../components';


// let timer
// const interval = 4000;


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Fvlhome',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'three-js': ThreeJs,
    'foot-bar2': FootBar2,
    // eslint-disable-next-line vue/no-unused-components
    'nav-bar2': NavBar2,
    // eslint-disable-next-line vue/no-unused-components
    'info-bar': InfoBar,
    // eslint-disable-next-line vue/no-unused-components
    'ani-back': Anibackground,
    'banner-background': BannerBackground,
    'loading-page': Loading,

  },
  created() {
  // this.showJumpingPage=true;
  },

  data() {
    return {
      loading: true,
      showJumpingPage: true,
      customOrder: [3, 4, 1, 11, 2, 7, 10, 6, 5, 9, 8, 0, 13, 12],
      dateArray: [],
      slideData: [],
      show: true,
      type: 'All',
      currentMonth: {},
      currentDate: {},
      products: [],
      products2: [],
      startMonth: 10,
      secondMonth: 11,
      endMonth: 12,
      productData: {
      },
      banner: '../assets/2024banner.png',
      link: 'early-bird',
      transitionName: 'left-in',
      msg: 'A quick-start vue.js frontend development template.',
      imgs: [
        {type: 'img', src: './imgs/1.jpeg'},
      ],
      map: null,
      lat: 25.038773,
      lng: 121.540410,
    };
  },

  methods: {
    change_zh() {
      this.$router.push({name: 'Fvlhome'}).then(() => {
        window.location.reload();
      });
    },
    closeJump() {
      this.showJumpingPage = false; // 点击按钮后设置为 false，隐藏字卡
    },
    // 建立地圖
    initMap() {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      const google = window.google;
      this.map = new google.maps.Map(document.getElementById('map'), {
        // 設定地圖的中心點經緯度位置
        center: {lat: this.lat, lng: this.lng},
        // 設定地圖縮放比例 0-20
        zoom: 16,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false,
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#1d2c4d',
              },
            ],
          },
          {
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#ffeb3b',
              },
            ],
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#8ec3b9',
              },
            ],
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#1a3646',
              },
            ],
          },
          {
            'featureType': 'administrative.country',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#4b6878',
              },
            ],
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#64779e',
              },
            ],
          },
          {
            'featureType': 'administrative.province',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#4b6878',
              },
            ],
          },
          {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#334e87',
              },
            ],
          },
          {
            'featureType': 'landscape.natural',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#023e58',
              },
            ],
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#283d6a',
              },
            ],
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#6f9ba5',
              },
            ],
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#1d2c4d',
              },
            ],
          },
          {
            'featureType': 'poi.business',
            'stylers': [
              {
                'visibility': 'off',
              },
            ],
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#023e58',
              },
            ],
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text',
            'stylers': [
              {
                'visibility': 'off',
              },
            ],
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#3C7680',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#304a7d',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#98a5be',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#1d2c4d',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#2c6675',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#255763',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#b0d5ce',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#023e58',
              },
            ],
          },
          {
            'featureType': 'transit',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#98a5be',
              },
            ],
          },
          {
            'featureType': 'transit',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#1d2c4d',
              },
            ],
          },
          {
            'featureType': 'transit.line',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#283d6a',
              },
            ],
          },
          {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#3a4762',
              },
            ],
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#0e1626',
              },
            ],
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#4e6d70',
              },
            ],
          },
        ],
      });
    },
    setMarker() {
      // 建立一個新地標
      const google = window.google;
      const marker = new google.maps.Marker({
        // 設定地標的座標
        position: {lat: this.lat, lng: this.lng},
        // 設定地標要放在哪一個地圖
        map: this.map,
      });
      // 透過 InfoWindow 物件建構子建立新訊息視窗
      const infowindow = new google.maps.InfoWindow({
        // 設定想要顯示的內容
        content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">East Lawn</p>
          </div>
        `,
        // 設定訊息視窗最大寬度
        maxWidth: 200,
      });
      // 在地標上監聽點擊事件
      marker.addListener('click', () => {
        // 指定在哪個地圖和地標上開啟訊息視窗
        infowindow.open(this.map, marker);
      });
    },
    // jump(id){
    //   this.$router.push(
    //     { name:item.link,
    //      query:{id}}
    //      );
    // },
    chosework(index) {
      // console.log(item);
      // for (var i = 0; i < this.products.length; i++) {
      // console.log(i);
      console.log(index);

      // }
    },

    plus() {
      console.log('已選擇預售票');
    },

    setShow(index) {
      this.show = index;
    },
    nextShow() {
      this.show ++;
    },

    slideCtrl(slidesToShow = 1) {
      if (slidesToShow > 0 ) {
        const shiftItem = this.slideData.shift();
        this.slideData.push(shiftItem);
        return;
      }
      if (slidesToShow <0) {
        const shiftItem = this.slideData.pop();
        this.slideData.unshift(shiftItem);
      }
    },

  },
  watch: {
    show(nVal, oVal) {
      if (nVal<0) {
        this.show = this.imgs.length -1;
      } else if (nVal > this.imgs.length -1) {
        this.show = 0;
      } else {
        if (oVal < 0 ) this.transitionName = 'left-in';
        else if (oVal > this.imgs.length -1 ) this.transitionName = 'right-in';
        else this.transitionName = nVal>oVal ?'right-in' : 'left-in';
      }
    },
  },


  onMounted() {
    //  parallaxie('.back-image.parallaxie');
  },
  mounted() {
    console.log(this.currentMonth);
    console.log(this.$route);
    console.log(this.dateArray);
    this.initMap();
    this.setMarker();
    // ----------自動輪播----------------
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    setTimeout(() => {
      this.loading = false; // 设置加载完成
      this.$nextTick(() => {
        // 在 DOM 更新后执行的操作
        console.log('页面加载完成，可以进行后续操作');
        this.showJumpingPage = true;
      });
    }, 500); // 2秒后加载完成
    // gsap.to('.banner',{
    //     scrollTrigger:{
    //      pin:true,
    //      trigger:'.banner-box',
    //      start:"bottom 100%",
    //     //  end:"+=800 0%",
    //     end:"+=200 0%",
    //      // toggleActions:'play reverse restart reverse',
    //      // markers:{
    //      //   startColor:"orange",
    //      //    endColor:"blue",
    //      //   fontSize:"2rem"
    //      // }
    //    }
    // }),
    // gsap.to('#date-img',{
    //   ease: "power2.in",
    //  opacity:1,
    //  duration:1,
    //     scrollTrigger:{
    //      trigger:'.banner',
    //      start:"top 35%",
    //      end:"center 0%",
    //      toggleActions:'play plaue none none',
    //     //  markers:{
    //     //    startColor:"orange",
    //     //     endColor:"blue",
    //     //    fontSize:"2rem"
    //     //  }
    //    }
    // }),
    gsap.to('.fvl_about', {
      scrollTrigger: {
        pin: true,
        trigger: '.about-background',
        start: '26% 70%',
        end: '+=300 0%',
        // toggleActions:'play reverse restart reverse',
        //  markers:{
        //    startColor:"orange",
        //     endColor:"blue",
        //    fontSize:"2rem"
        //  }
      },
    }),

    gsap.to('.background3', {
      left: -20,
      duration: 1,
      scrollTrigger: {
        trigger: '.fvl_en',
        start: 'bottom 60%',
        end: 'bottom 20%',
        //  toggleActions:'play pause restart none',
        toggleActions: 'play play reverse none',
        //   markers:{
        //   startColor:"purple",
        //    endColor:"blue",
        //   fontSize:"2rem"
        // }
      },
    });


    gsap.to('.fvl_about', {
      opacity: 1,
      top: 20,
      duration: 0.1,
      scrollTrigger: {
        trigger: '.banner',
        start: '70% 60%',
        end: '70% 40%',
        //  toggleActions:'play pause restart none',
        //   markers:{
        //   startColor:"orange",
        //    endColor:"blue",
        //   fontSize:"2rem"
        // }
      },
    }),

    // gsap.to('.sales_info',{
    //    opacity:1,
    //    top:20,
    //    duration:0.1,
    //    scrollTrigger:{
    //      trigger:'.exibition_info',
    //      start:"40% 0%",
    //      end:"bottom 0%",
    //      //  toggleActions:'play pause restart none',
    //      //   markers:{
    //      //   startColor:"orange",
    //      //    endColor:"blue",
    //      //   fontSize:"2rem"
    //      // }
    //    }
    // }),

    gsap.to('.program-list', {
      opacity: 1,
      top: 20,
      duration: 1,
      scrollTrigger: {
        trigger: '.tickets',
        start: 'bottom 60%',
        end: 'bottom 40%',
        //  toggleActions:'play pause restart none',
        //   markers:{
        //   startColor:"orange",
        //    endColor:"blue",
        //   fontSize:"2rem"
        // }
      },
    }),
    gsap.to('.grid_title', {
      opacity: 1,
      top: 20,
      duration: 0.1,
      scrollTrigger: {
        trigger: '.program-list',
        start: '90% 60%',
        end: '90% 40%',
        //  toggleActions:'play pause restart none',
        //   markers:{
        //   startColor:"orange",
        //    endColor:"blue",
        //   fontSize:"2rem"
        // }
      },
    }),
    gsap.to('.faq_title', {
      opacity: 1,
      top: 20,
      duration: 0.1,
      scrollTrigger: {
        trigger: '.grid_title',
        start: 'bottom 60%',
        end: 'bottom 40%',
        //  toggleActions:'play pause restart none',
        //   markers:{
        //   startColor:"orange",
        //    endColor:"blue",
        //   fontSize:"2rem"
        // }


      },
    });

    // timer = setInterval(this.nextShow,interval),

    // axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works?search=Future%20Vision%20Lab&limit=25',{responseType:'json'}).then((response)=>{
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works?search=Future%20Vision%20Lab%202024&limit=100', {responseType: 'json'}).then((response) => {
      this.products = response.data;

      console.log(this.products);
    }) .catch((err)=>{
      console.log(err.response);
    });
  },

  computed: {
    orderedProducts() {
      // eslint-disable-next-line max-len
      return this.customOrder.map((index) => this.products[index]).filter((item) => item); // 按照自定义顺序重排
    },
    ShowOctober() {
      const currentMonth = new Date().getMonth() +1;
      //  const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      //  this.currentDate = currentDate;
      return currentMonth === this.startMonth;
    },
    ShowOctoberweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.startMonth && this.currentDate >=21 && this.currentDate <=27;
    },
    //  ShowOctfinished(){
    //   const currentMonth = new Date().getMonth() + 1;
    //    const currentDate = new Date().getDate();
    //   this.currentMonth = currentMonth;
    //    this.currentDate = currentDate;
    // eslint-disable-next-line max-len
    //   return currentMonth === this.startMonth && this.currentDate >=22 && this.currentDate <=25;
    //  },
    //  ShowOctfinishedAll(){
    //   const currentMonth = new Date().getMonth() + 1;
    //    const currentDate = new Date().getDate();
    //   this.currentMonth = currentMonth;
    //    this.currentDate = currentDate;
    // eslint-disable-next-line max-len
    //   return currentMonth === this.startMonth && this.currentDate >22 && this.currentDate >25;s
    //  },
    ShowNovember() {
      const currentMonth = new Date().getMonth() + 1;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      return currentMonth === this.secondMonth;
    },
    ShowNovemberfirstweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.startMonth && this.currentDate >=28 && this.currentDate <=31 || currentMonth === this.secondMonth && this.currentDate >= 1 &&this.currentDate <=3;
    },

    ShowNovembersecondweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 4 && this.currentDate <=10;
    },
    ShowNovemberthirdweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 11 && this.currentDate <=17;
    },
    ShowNovemberfourthweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 18 && this.currentDate <=24;
    },
    ShowNovemberfifthweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 25 && this.currentDate <=30;
    },

    ShowDecember() {
      const currentMonth = new Date().getMonth() + 1;
      //  const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      //  this.currentDate = currentDate;
      return currentMonth === this.endMonth;
    },
    ShowDecemberfirstday() {
      const currentMonth = new Date().getMonth() +1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      return currentMonth === this.endMonth && this.currentDate == 1;
    },
    ShowDecemberfirstweek() {
      const currentMonth = new Date().getMonth() +1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 2 && this.currentDate <=7;
    },
    ShowDecembersecondweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 8 && this.currentDate <=15;
    },
    ShowDecemberthirdweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 16 && this.currentDate <= 22;
    },
    ShowDecemberfourthweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 23 && this.currentDate <= 29;
    },
  },


});

</script>

<style lang="scss" scoped>

.dropbtn{
 background-color:#d00053;
 color: rgb(255, 255, 255);
 padding: 15px;
 width:8rem;
 height: 3rem;
 font-size: 1rem;
 font-weight: 600;
 border: none;
 // border-radius: 30px;
}
.dropdown{
//  position:fixed;
//  right:10%;
//  top: 3%;
 display:inline-block;
 z-index:4;
}
.dropdown-content {
 display: none;
 position: absolute;
 background-color: #f9f9f9;
 min-width: 160px;
 border-radius: 0;
 box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
 z-index:2;
}
.dropdown-content a{
 padding-left:1em;
}
.dropdown-content a:hover {
 background-color: #ff2e77;
 color:white;
}

.dropdown:hover {
 .dropdown-content {
 display:flex;
 flex-direction: column;
}
}
.dropdown:hover .dropbtn {
 background-color:#d00053;
}
.fixed-list{
  display:flex;
  align-items: center;
  position:fixed;
   right:3%;
   top: 3%;
   z-index:40;
   gap:5px;
}
.contact_us{
  background-color:transparent;
  // position:fixed;
  // top:3%;
  // right:20%;
  // z-index:4;
  display:flex;
  gap:5px;
}

.banner-box{
 height: 100vh;
 width:100vw;
 margin: 0 auto;
 position:relative;
 // margin-top:4rem;
}
.jumping-page{
  width:50%;
  height:30%;
  position:fixed;
  background-image:linear-gradient(#845be4 10%,#f98e57 90%);
  border-radius:25px;
  top:50%;
  left:50%;
  z-index:999;
  align-items:center;
  transform:translate(-50%, -50%);
  animation-name:ease-in;
  animation-duration:2s;
}
@keyframes ease-in{
  from{top:-50%;opacity:0;}
  to{top:50%;opacity:1;}
}
.jumping-word{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:20px;
  text-align:left;
  color:white;
  font-weight:700;
  font-size:1.2em;
}
.jumping-buttom{
  border-radius:25px;
  background:blue;
  color:white;
  width:5em;
  text-align:center;
  margin-top:0.5em;
}
.jumping-buttom:hover{
  background:white;
  color:blue;
}
.banner{
 height: 100%;
 width:100vw;
 object-fit: cover;
 overflow: hidden;
 z-index: 1;
 position:relative;
}
#date-img{
  z-index:5;
  position: absolute;
  bottom: 0;
  margin:0 auto;
  animation: fade1 2s linear;
}
@keyframes fade1 {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
#date-img img{
  width:100vw;
  height:100vh;
  z-index:999;
}
#title-img{
  // opacity:0;
  z-index:9;
  position:absolute;
  bottom: 0;
  margin:0 auto;
  animation: fade 2s linear;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
#title-img img{
  width:100vw;
  height:100vh;
  z-index:999;
}

.banner-img{
position:relative;
z-index:2;
width: 100vw;
height:100%;
}
.pulse{
position: relative;
width: 300px;
height: 300px;
background: rgb(255, 40, 140);
border-radius: 50%;
left:62%;
top:32%;
z-index: 0;
filter: blur(5px);
}
.pulse span{
 position: absolute;
 width: 100%;
 height: 100%;
 opacity:.8;
 background:inherit;
 border-radius:inherit;
 animation: pulseAnimation 4s ease-out infinite;
 animation-delay: calc(1s * var(--i));
}
.table{
 font-size:1.1em;
 width:80%;
 border: none !important;
 border-bottom: none;
 text-align: center;
 border-collapse:collapse !important;
 border-radius: 25px;
 width: 100%;
 margin-top: 2em;
}
.table th {
  white-space:nowrap;
  text-align:center;
  padding:20px;
  width: 10%;
}
.table td{
 background-color: white;
 padding: 20px;
//  white-space: wrap !important;
}
@keyframes pulseAnimation{
 100%{
   opacity: 0;
   transform: scale(2);
 }
}
.banner-back{
 // position: absolute;
 top: 0;
 // z-index: -1;
}
.fvl-logo-img{
 position: absolute;
 top: 10%;
 z-index: 1;
 width: 60%;
 height: auto;
 display: flex;
 align-items: center;
}
.page{
 position: absolute;
 display: flex;
 justify-content: center;
 width: 100%;
 height:100%;
 overflow-x: hidden;

}
.right-in-enter{
   left: 100%;
}
.right-in-enter-active,.right-in-leave-active{
  transition: left 0.5s;
}
.right-in-enter-to,.right-in-leave{
    left: 0%;
}
.right-in-leave-to{
    left:-100%;
}

// -----------------------------
.slider-btn{
 position:absolute;
 top:50%;
 opacity: 0.8;
 // z-index:999;
 height:10%;
 width: 50px;
 border: none;
 outline:0;
 cursor:pointer;

}
.slider-btn-left{
 left:10px;
background-color: transparent;
}
.slider-btn-right{
 right:10px;
  background-color: transparent;
}
.slider-icon:hover{
   border-color:rgb(97, 97, 97)
}
.slider-icon{
   display: inline-block;
   width: 20px;
   height: 20px;
   border-left:3px solid rgb(255, 255, 255);
   border-bottom:3px solid rgb(255, 255, 255);
   transition:border 2s;
}
.slider-icon-left{
 transform:rotate(45deg);
}
.slider-icon-right{
   transform:rotate(-135deg)
}
// ------left----------

.left-in-enter{
   left: -100%;
}
.left-in-enter-active,.left-in-leave-active{
  transition: left 2s;
}
.left-in-enter-to,.left-in-leave{
    left: 0%;
}
.left-in-leave-to{
    left:100%;
}


// ------left----------
.right-arrow{
 border: solid black;
 border-width: 0 3px 3px 0;
 display: inline-block;
 padding: 3px;
 transform: rotate(-45deg);
 -webkit-transform: rotate(-45deg);
}
// --------------banner----------


.additional-bar {
 padding: 15px;
}
.gh-btn {
 background-color: #232323;
 background-repeat: no-repeat;
 border: 1px solid #d5d5d5;
 border-radius: 4px;
 color: #333;
 text-decoration: none;
 text-shadow: 0 1px 0 #fff;
 white-space: nowrap;
 cursor: pointer;
}
.image-container{
 margin-bottom: auto;
 background-color: aqua;

}

.gdlr-core-title-item-title{
   animation: fade 0.5s linear;
}
@keyframes fade {
   from {
       opacity: 0;
   }
   to {
       opacity: 1;
   }
}
.gdlr-core-title-item-caption{
 animation: fade 0.5s linear;
}
@keyframes fade {
   from {
       opacity: 0;
   }
   to {
       opacity: 1;
   }
}
.about-future-vision{
 animation: fade 0.5s linear;
}
@keyframes fade {
   from {
       opacity: 0;
   }
   to {
       opacity: 1;
   }
}
.gdlr-core-text-box-item-content{
 animation: fade 0.5s linear;
}
@keyframes fade {
   from {
       opacity: 0;
   }
   to {
       opacity: 1;
   }
}


.flex-col{
 flex-direction:column
}
.md\:flex{
 display:flex;
}
.grid-cols-1{
 grid-template-columns:repeat(1, minmax(0, 1fr));
}
.grid-cols-2{
 grid-template-columns:repeat(2, minmax(0, 1fr));
}
.md\:grid-cols-5{
 // grid-template-columns:repeat(5, minmax(0, 1fr));
 grid-template-columns:repeat(2, minmax(0, 1fr));
}
.gap-4{
 gap:1rem;
}
.grid-cols-1{
 grid-template-columns:repeat(1, minmax(0, 1fr));
}
.relative{
 position:relative
}
.grid{
 display: grid;
}
.mb-8{
 margin-bottom:2rem;
}
.rounded-xl{
 border-radius:0.75rem;
}
.img{
 vertical-align: middle;
}
.img{
 max-width:100%;
 // height:auto;
}
.md\:hidden{
 display:grid;
}
.hidden{
 display: none;
}


.preview {
 margin: 2rem auto 0 auto;
 width: 100%;
 height:auto;
 background:transparent;
 background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/87db0364-e198-4abb-b4e9-d6c3c70ebd68/RFNDXzMyNjQuanBlZy0xNjMzMTY4NDQzNzYwLTY5NjE=.jpeg);
 background-size: cover;
 background-position: top center;
 background-repeat: no-repeat;
 padding: 5.5rem 2.4rem;
 // border-radius: 0.8rem;
 display: flex;
 object-fit: cover;
 flex-direction: column;
 align-items: center;
 // overflow: hidden;
 // animation:bottomIn 1s linear 0s;
}
// @keyframes bottomIn {
//     from {
//         transform: translate3d(30%, 0%, 0);
//     }

//     to {
//         transform: none;
//     }
// }

.preview2 {
 margin: 2rem auto 0 auto;
 width: 100%;
 height: auto;
 background:transparent;
 background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/a1a593a6-c6ba-4c8f-8663-1ee9d72252d3/Q29weSBvZiBEb21lX0EuanBnLTE2MzMxNzEyMDA3MDctMzE0Mw==.jpeg);
 background-size: cover;
 background-position: top center;
 background-repeat: no-repeat;
 padding: 5.5rem 2.4rem;
 // border-radius: 0.8rem;
 display: flex;
 flex-direction: column;
 object-fit: cover;
 align-items: center;
 overflow: hidden;
 // animation:bottomIn 2s linear 0s;
}

.preview3 {
 margin: 2rem auto 0 auto;
 width: 100%;
 height: auto;
 background:transparent;
 background-image: url(https://unzip-clab-api.clab.org.tw/work-photo/a80d9658-dbf7-45be-bb50-9642899f6212/56ys5LqM57WELmpwZy0xNjMzMTY4NzM5OTI1LTU1Mzc=.jpeg);
 background-size: cover;
 background-position: top center;
 background-repeat: no-repeat;
 padding: 5.5rem 2.4rem;
 // border-radius: 0.8rem;
 display: flex;
 flex-direction: column;
 object-fit: cover;
 align-items: center;
 overflow: hidden;
 // animation:bottomIn 3s linear 0s;
}
.preview__text{
 display: flex;
 flex-direction: column;
 align-items: flex-start;
}
.preview__text__link__btn{
 background-color: #232323;
 border-radius: 30px;
 transition:all 0.3s linear;
 color: aliceblue;

}
.preview__text__link__btn:hover{
 background-color: rgb(236, 236, 236);
}
.default-btn{
 text-transform:uppercase;
 font-weight:600;
 font-size: 0.8rem;
 line-height:0.5rem;
 letter-spacing: 0.1rem;
 padding:0.7rem 0.7rem;
 border: none;
 cursor: pointer;
 margin-top: 1rem;
}
.default-btn:hover{
 color: #232323;
}
label {
 background: #CCC;
 display: inline-block;
 cursor: pointer;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 margin-left: 5px;

}
label:hover{
 background-color: #333;
}
input[type=checkbox]:checked{
   label{
     background:black;
   }
}

// -------------slider2----------------
.slide{
   width: 100%;
   overflow: hidden;
}
.slide-list{
 display: flex;
 list-style-type: none;
 padding: 0;
}
.slide-article{
 background-color: #eee;
 padding-top: 10px;
 height: 100%;
 margin: 10px;
 border-radius: 10px;
}
.slide-ctrl{
 margin-top: 3rem;
display: flex;
align-items: center;
justify-content: center;
}
.slide-prev,
.slide-next{
  width: 150px;
  display: inline-block;
  background-color: #c0c0c0;
  color: #fff;
  margin: 0 10px;
  padding:5px 15px;
  border-radius: 50px;
  cursor: pointer;
  &:hover{
   color: rgb(68, 68, 68);
  }

}
.square{
 width: 150px;
 height: 150px;
 background-color: coral;
}
.early-bird{
 width: 20em;
 height: 3em;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius:30em;
 box-shadow: 6px 6px 12px #c5c5c5;
 font-family: inherit;
 font-weight: 900;
 cursor: pointer;
 overflow: hidden;
 background-color:transparent;
 background-image: linear-gradient(to  right,#ffc758 0%, #ff9d00 60%);
 opacity: 0.8;
 border:none;
 padding:25px;
 margin:0.5rem;
 position: relative;
}
.early-bird::before{
 content: '';
 width: 0;
 height:100%;
 border-radius: 30em;
 position: absolute;
 top: 0;
 left: 0;
 // background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
 transition: .5s ease;
 display: block;
 z-index: -1;
 background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
}
.early-bird:hover::before{
 width: 20em;
 opacity: 1;
}

// .early-bird:hover{
//   background-color: #232323;
//   color: rgb(0, 255, 170);
// }
.early-bird:hover{
 color: white;
}

.pre-sale{
 width:10em;
 height: 3em;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius:30em;
 box-shadow: 6px 6px 12px #c5c5c5;
 font-family: inherit;
 font-weight: 900;
 cursor: pointer;
 overflow: hidden;
 background-color:transparent;
 background-image: linear-gradient(to right,#ffc758 0%, #ff9d00 60%);
 opacity: 0.8;
 border:none;
 padding:25px;
 margin:0.5rem;
 position: relative;
}
.pre-sale::before{
 content: '';
 width: 0;
 height:100%;
 border-radius: 30em;
 position: absolute;
 top: 0;
 left: 0;
 background-image: linear-gradient( to right,#2530ff 0%, #ff0606 80%);
 transition: .5s ease;
 display: block;
 z-index: -1;
}
.pre-sale:hover::before{
 width:10em;
}
// .pre-sale:hover{
//   background-color: #232323;
//   color: rgb(0, 255, 170);
// }
.pre-sale:hover{
 color: white;
}

.reqular-tickets{
 width: 9em;
 height: 3em;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius:30em;
 box-shadow: 6px 6px 12px #c5c5c5;
 font-family: inherit;
 font-weight: 900;
 cursor: pointer;
 overflow: hidden;
 background-color:transparent;
 border:none;
 padding:25px;
 margin:0.5rem;
 position:relative;
}
.reqular-tickets::before{
 content: '';
 width: 0;
 height:100%;
 border-radius: 30em;
 position: absolute;
 top: 0;
 left: 0;
 // background-image: linear-gradient(to right,#0fd850 0%, #f9f047 100%);
 background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
 transition: .5s ease;
 display: block;
 z-index: -1;
}
.reqular-tickets:hover::before{
 width: 9em;
}
.reqular-tickets:hover{
 color: white;
}

// .reqular-tickets:hover{
//   background-color: #232323;
//   color: rgb(0, 255, 170);
// }
.students-tickets{
 width: 9em;
 height: 3em;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius:30em;
 box-shadow: 6px 6px 12px #c5c5c5;
 font-family: inherit;
 font-weight: 900;
 cursor: pointer;
 overflow: hidden;
 background-color:transparent;
 border:none;
 padding:25px;
 margin:0.5rem;
 position: relative;
}
.students-tickets::before{
 content: '';
 width: 0;
 height:100%;
 border-radius: 30em;
 position: absolute;
 top: 0;
 left: 0;
 // background-image: linear-gradient(to right,#0fd850 0%, #f9f047 100%);
 background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
 transition: .5s ease;
 display: block;
 z-index: -1;
}
.students-tickets:hover::before{
 width: 9em;
}
.students-tickets:hover{
 color: rgb(255, 255, 255);
}
.about-background{
 background:transparent;
 // box-shadow: 0 0 100px 20px #f8536e inset;
 position: relative;
 // box-shadow:0 0 30px 30px blue ;
}
.english_btn{
 border: none;
 border-radius: 30px;
 background-color: black;
 color: #ffffff;
 position: absolute;
 right:10rem;z-index: 999;
 top:2rem;
 width: 5rem;
 height: 2rem;
}
.english_btn:hover{
 border: none;
 border-radius: 30px;
 background-color: rgb(255, 255, 255);
 color: #000000;
 position: absolute;
 right:10rem;z-index: 999;
 top:2rem;
 width: 5rem;
 height: 2rem;
}
.fvl_about{
 width:75vw;
 height:100vh;
 margin: 0 auto;
 display: flex;
 padding:2rem;
 position: relative;
//  top: -6%;
 z-index: 2;
 flex-direction: column;
 align-items:flex-start;
 justify-content:flex-start;
 padding: 5rem;
 transition: 0.6s ease-in;
 opacity: 0;
 margin-top:2em;
}
.fvl_en{
 box-sizing: border-box;
 color:#ffca8c;
 font-size:9rem;
 font-weight: 700;
 line-height: 1;
 text-transform: uppercase;
 font-family:Impact, fantasy
 ;text-align:left;
 padding-bottom:1rem;
 word-wrap:break-word;
}
.fvl_icon{
 width:40%;
 height:100%;
 margin-right:2rem;
}
.eyes{
 width:10rem;
  height:6rem;
  background-color:black;
  position: relative;
  overflow: hidden;
}
.eye_ball{
 width:80%;
 height: 100%;
 background-color:white;
 border-radius:100% 0;
 transform:rotate(32deg);
 position: absolute;
 left:20%;top:43%;
 overflow: hidden;
 border: 2px black solid;
}
.ball{
 width:60%;
 height: 50%;
 border: 20px solid black;
 border-radius:50%;
 position: absolute;
 top:30%;
 left: 30%;
 transform: rotate(-30deg);
}
.reflect{
 width: 15px;
 height: 15px;
 border-radius:50%;
 background-color:white;
 position: absolute;
 top: -400%;
 left: 60%;
}
.about_fvl{
 color: white;
 width:100%;
 height: auto;
 background: rgba(255, 255, 255, 0.2);
 border-radius:25px;
 box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
 backdrop-filter: blur(5px);
 -webkit-backdrop-filter: blur(5px);
 font-size: 1.1em;
 line-height:1.8em;
 border: 1px solid rgba(255, 255, 255, 0.3);
 padding: 2em;
}
.fvl_tickets{
 width: 100vw;
  height:auto;
  margin-top: 1rem;
  position:relative;
  padding-bottom: 4em;
}
.exibition_info{
 width: 100%;
 height:auto;
 margin: 0 auto;
 display: flex;
 flex-direction:column;
 justify-content: center;
 align-items: center;
}
.sales_info{
 width: 100%;
 top: -6%;
 opacity: 1;
 height: auto;
 z-index: 2;
 // margin-top: 1rem;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-bottom: 4rem;
 position:relative;
 transition: 0.6s ease-in;
}
.title_background{
 width:10rem;
 height:auto;
 box-sizing:border-box;
 border-radius: 30px;
 background-color: black;
 color: aliceblue;
 top:0;
 display: flex;
 justify-content: center;
 align-items: center;
 border: none;
 padding: 5px;
 margin-bottom:0;
 font-size: 2rem;
 font-weight: 700;
}
.location{
  margin-top:0.8em;
  font-size:1.1em;
}
.google-map{
  height:500px;
  width:100%
}
.team{
  width:80%;
  height:auto;
  color:white;
  display:flex;
  flex-direction: row;
  margin-top: 3em;
  gap:20px;
  font-size: 1.1em;
}

.about_event{
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 text-align: center;
 margin-top: 1rem;
 padding-bottom: 2rem;
 width: 100%;
 height: 100%;
 font-size:1.5rem;
 font-weight:bolder;
 color: rgb(255, 255, 255);
}
.event_date{
 display: flex;
 flex-direction:column;
 flex-wrap: wrap;
 font-weight:bolder;
 color: rgb(255, 255, 255);
}
.date{
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 color: white;
}
.hash-tags{
   display: flex;flex-direction: row;
}
.tickets{
 width: 70%;
 height: auto;
 position: relative;
 z-index: 2;
 background: white;
 padding: 2.5em;
 border-radius: 25px;
 margin-top: 2em;
 font-weight:600;
}
.ticket_buttons{
 top: 0;
 display: flex;
 justify-content:center;
 align-items: center;
 flex-wrap: wrap;
 margin:0.5rem;
}


.tickets_info{
 width:100%;
 height: auto;
 display: flex;
 flex-direction:row;
 justify-content:flex-start;
  display: flex;
  flex-direction:column;
  margin-top: 2rem;
  padding: 1rem;
}

.ticket-price-animate{
 animation: price-enter 0.5s linear;
}
.ticket-time-animate{
 animation: time-enter 0.5s linear;
}
.sales-enter-animate{
 animation: sales-enter 0.5s linear;
}
//////ticket-info-enter-animation
.early-bird-price{
 animation: enter-in 1s linear;
}
.pre-sale-price{
 animation: enter-in 1s linear;
}
.regular-price{
 animation: enter-in 1s linear;
}
.student-price{
 animation: enter-in 1s linear;
}
.early-bird-time{
 animation: enter-in 1s linear;
}
.pre-sale-time{
 animation: enter-in 1s linear;
}
.regular-time{
 animation: enter-in 1s linear;
}
.student-time{
 animation: enter-in 1s linear;
}
@keyframes enter-in {
 0% {opacity: 0;margin-left: -2rem;}
 100%{opacity: 1;margin-left: 0;}
}
@keyframes price-enter{
 0%{opacity: 0;margin-left: -2rem;}
 100%{opacity: 1;margin-left: 0;}
}
@keyframes time-enter{
 0%{opacity: 0;margin-left: -2rem;}
 100%{opacity: 1;margin-left: 0;}
}
@keyframes sales-enter{
 0%{opacity: 0;margin-left: -2rem;}
 100%{opacity: 1;margin-left: 0;}
}
//////

.ticket-price{
 display: flex;
 flex-direction:row;
 width:100%;
}
.ticket-time{
display: flex;
flex-direction:row;
width:100%;
}
.sales-info{
 display: flex;
 flex-direction:row;
 width:100%;
}
.notice{
 font-size:1rem;
 font-weight:lighter;
 color: black;
 margin-top: 1rem;
 line-height:1.5;
 letter-spacing: .5px;
}
.background2{
 width: 100vw;
 height:100vh;
 position: absolute;
 top:0;
 overflow: hidden;
 z-index:1;
}
.background3{
 width: 100%;
 height:100%;
 position: absolute;
 bottom:0;
 overflow: hidden;
 z-index:2;
 opacity:1;
 left:-30%;
 pointer-events: none;
}
.program-list{
 display:flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 width:70%;
 height:auto;
 position: relative;
 margin: 0 auto;
 text-align: center;
 margin-top: 2rem;
 z-index: 1;
 opacity: 0;
 top: -6%;
 transition: 0.8s ease-in;
}
.grid_title{
 display: flex;
 flex-direction:column;
 justify-content: center;
 align-items:center;
 width: 80%;
 height: auto;
 position: relative;
 margin: 0 auto;
 margin-top:4rem;
 z-index: 1;
 opacity: 0;
 top: -6%;
 transition: 0.8s ease-in;
}
.faq_title{
 display: flex;
 flex-direction:column;
 justify-content: center;
 align-items:center;
 width: 80%;
 height: auto;
 position: relative;
 margin: 0 auto;
 margin-top:6rem;
 z-index:2;
 opacity:0;
 top: -6%;
 transition: 0.8s ease-in;
}
.container{
 width:100%;
 height: auto;
 position: relative;
 margin:0 auto;
}
.faq-container{
 width:90%;
 height:auto;
 text-align: center;
 position: relative;
 margin: 0 auto;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding:2rem;
 margin-top: 1rem;
 margin-bottom:5rem;
 z-index: 1;
}
.box{
 width:92%;
 border-radius:25px;
 padding: 2.5rem !important;
}
.content{
 width: 100%;
 height: auto;
 text-align: left;
 font-size:1.5rem;
 font-weight: bolder;
}

.row{
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content:flex-start;
   align-items: center;
   padding: 1rem 1rem;
}

.card{
 position: relative;
 overflow: hidden;
 display: flex;
 background: #ff7b7b;
 z-index: 999;
 width:300px;
 height:300px;
 margin:10px;
 flex-direction: column;
 justify-content: center;
 flex-wrap: wrap;
 align-items: center;
 border-radius: 25px;
}
.imagewrap{
 width:100%;
 height:100%;
 position:absolute;
 top: 0;
 border-radius:25px;
}
.imagewrap img{
 transition:transform 0.8s;
 height:100%;
 width:100%;
 object-fit:cover;
 z-index: 2;
}
.imagewrap-background{
 position: absolute;
 background-color:rgb(128, 204, 239);
 width: 100%;
 height: 100%;
 z-index: 3;
 opacity: 0;
}
.card:hover{
 .imagewrap-background{
 opacity:0.8;
 }
 .wordwrap{
   transition: 1s ease-in-out;
   opacity: 1;
   font-size: 1.5em;
   color: white !important;
   position: absolute;
   z-index: 999;
 }
 .imagewrap img{
  transition: transform 0.1s ease;
 }
 .imagewrap img{
   transform: scale(1.2);
 }
}

.mb-80{
  margin-bottom:5px;
}
.wordwrap{
 width:100%;
 height:20%;
 opacity: 0;
 padding:2px;
 position: absolute;
 top:40%;
 color: rgb(255, 255, 255) !important;
 font-weight: bolder;
 text-align: center;
 display: flex;
 font-size:1rem;
 justify-content: center;
 align-items: center;
 padding: 10px;
}
// .wordwrap:hover{
//    font-size: 1rem;
// }
.wordwrap:hover{
 color: rgb(255, 255, 255) !important;
}

.card:after{
 content: '';
   width: 0%;
   height: 1px;
   border: 1.5px rgb(0, 255, 170) solid;
   background-color: #000;
   position: absolute;
   bottom:0;
   left: 0;
   transition: all .3s linear;
   z-index: 999;
}

.card:hover::after{
  width: 100%;
}
.shut{
 width:200px;
 height:80px;
 transform: rotate(-30deg);
 position: absolute;
 border-radius:40%;
 background-color: #000;
 top: -65%;
 left:-50%;
 z-index: 999;
 transition: 0.5s ease-in-out;
}
summary{
  margin-bottom: 1rem;
  outline: none;
  position: relative;
  font-size: 1.2rem;
}

details >summary::before{
  position: absolute;
  right: 20px;
 }
 details{
  margin-bottom: 2rem;
 }
 details[open] summary ~ * {
 animation: sweep .5s ease-in-out ;
}
.logos{
  width:80%;
  height:auto;
  background-color:transparent;
  color:white;
  display:flex;
  position:relative;
  margin:0 auto;
  gap:10px;
  margin-top: 2em;
  flex-direction:row;
}
.Supervisor img{
  width:40%;
}
.Organizer img{
  width:40%;
}
.Executive img{
  width:40%;
}
.Collaborator{
  width:80%;
  height:20%;
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:10px;
  margin-top:10px;
  flex-wrap:wrap;
}
.Collaborator img{
  width:13%;
}

@keyframes sweep {
 0%    {opacity: 0; margin-left: -10px}
 100%  {opacity: 1; margin-left: 0px}

}

.forwords{
 background-color: springgreen;
}


@media only screen and (min-width:1280px) {
   .pulse{
    width: 300px;
    height: 300px;
    left:62%;
    top:30%;
 }
 }

 @media only screen and (max-width:1024px) {
   .section {
      padding: 3rem 1rem;
   }
   .pulse{
    width: 300px;
    height: 300px;
    left:55%;
    top:65%;
 }
 #date-img img{
  height:auto;
 }
 #title-img img{
  height:auto;
 }
 }


//  @media only screen and (min-width:1024px) {
//    .section {
//       padding: 3rem 0rem;
//    }
//    .pulse{
//     width: 300px;
//     height: 300px;
//     left:60%;
//     top:30%;
//   }
//  }
 @media only screen and (min-width:850px) {
 .banner-box{
   margin: 0 auto;
   position: relative;
   height:100vh;
   overflow: hidden;
   width: 100vw;
  //  margin-top: 4rem;
 }
   .banner {
       // height:600px;
       height: 100%;
       width: 100%;
   }
   .banner.img{
     height: 100%;
     width: 100%;
   }
   .banner-back{
   position: absolute;
   height:100%;
   top: 0;
   z-index: -1;
 }
   .pulse{
   width:250px;
   height:250px;
   left:62%;
   top:30%;
 }
 }
 @media only screen and (max-width:850px) {
   .about_event{
    margin-top: 4em;
   }
 }

 @media only screen and (min-width:1024px) {
   .section {
      padding: 3rem 0rem;
   }
   .pulse{
    width: 300px;
    height: 300px;
    left:60%;
    top:60%;
  }
 }
 @media only screen and (min-width:1440px) {
   .section {
      padding: 3rem 0rem;
   }
   .pulse{
    width: 300px;
    height: 300px;
    left:60%;
    top:30%;
  }
 }

@media only screen and (max-width:768px){
  // .dropdown{
  //   right: 15%;
  //   top:1%
  // }
  .jumping-page{
    width:90%;
    height: auto;
  }
  .fixed-list{
    right:5%;
    top:1%
  }
  .dropbtn{
    width: 4rem;;
  }
  // .contact_us{
  //   right:32%;
  //   top: 1%;
  // }
  #title-img{
  top:0;
 }
.banner-box{
 height: 400px;
 // top: 0px !important;
}
.banner-img img{
 transform: scale(2);
 right: 20%;
bottom: 40%;
}
.fvl_about{
  width:90vw;
 align-items: flex-start;
}
.program-list{
  width:80%;
}
.about_event{
  margin-top: 6em;
}
.location{
  font-size:0.8em;
  padding:5px;
 }
.hash-tags{
   flex-direction: column;
 }
 .tickets{
  width:80%;
 }
 .pulse{
   width: 200px;
   height: 200px;
   left: 58%;
   top: 20%;
 }
 .grid_title{
  width: 90%;
}
 .table{
 font-size: 0.7em;
}
.table th{
  padding: 10px !important;
}
.table td{
  padding: 10px !important;
}
.team{
  width:100%;
  font-size: 0.8em;
}
.logos{
  width: 100%;
  gap:10px;
  flex-direction: column;
}
.Supervisor img{
  width:30%;
}
.Organizer img{
  width:30%;
}
.Executive img{
  width:30%;
}
.Collaborator{
  width:100%;
  margin-top:10px;
}
.Collaborator img{
  width:30%;
}
}

@media only screen and (max-width:720px) {
  .jumping-page{
    height:auto;
    width:90%;
  }
  .fixed-list{
    right:5%;
    top:1%
  }
  .dropbtn{
    width: 4rem;
  }
 .banner-box{
   width: 100vw;
   height: 290px;
   overflow: hidden;
   margin: 0 auto;
   position: relative;
  //  margin-top:4rem;
 }
 #title-img{
  top:0;
 }
 .banner-back{
   height:80%;
   overflow: hidden;
   max-width: 100%;
 }
 .fvl_en{
   font-size: 5rem;
 }
//  .map{
//   width:80%;
// }
.program-list{
  width:80%;
}
.grid_title{
  width: 90%;
}
 .pulse{
   width: 200px;
   height: 200px;
   left: 40%;
   top:35%;
 }
 .fvl-logo-img{
   width: 80%;
   top:20%;
 }

 .title_background{
   font-size: 1rem;
   height: 2rem;
   width: 5rem;
 }
 .location{
  font-size: 0.8em;
  padding:5px;
 }
 .title_background iframe{
  width: 90%;
}
 .hash-tags{
   flex-direction: column;
 }
 .ticket_buttons{
   flex-direction: column;
 }
 .fvl_about{
   flex-direction: column;
   justify-content: center;
   align-items:flex-start;
   // width: 100% !important;
   height: auto;
   padding:1rem;
   padding-top: 3rem;
 }
 .fvl_icon{
   margin-bottom: 2rem;
 }
 .tickets{
   width: 80%;
 }
 .date{
   justify-content: center;
 }
 .early-bird{
   width: 14em;
   height:4em;
 }
 .early-bird:hover::before{
   width:14em;
 }
 .pre-sale{
   width: 10em;
   height:4em;
 }
 .pre-sale:hover::before{
   width:10em;
 }
 .reqular-tickets{
   width: 10em;
   height:4em;
 }
 .reqular-tickets:hover::before{
   width:10em;
 }
 .students-tickets{
   width: 10em;
   height:4em;
 }
 .students-tickets:hover::before{
   width:10em;
 }
 .about_fvl{
   width: 100% !important;;
   height:100%;
   font-size: 1em;
 }
 .early-bird-price{
   margin-left: 1rem;
 }
 .early-bird-time{
   margin-left: 1rem;
 }
 .pre-sale-time{
   margin-left: 1rem;
 }
 .regular-time{
  margin-left:1rem

 }
 .student-time{
   margin-left: 1rem;
 }
 .sales-detail{
   font-size: 0.8rem;
   margin-left: 1rem;
 }
 .background2{
   width: 100vw;
   height: auto;
 }
 .table{
 font-size: 0.7em;
}
.table th{
  padding: 10px !important;
}
.table td{
  padding: 10px !important;
}
 .mb-80{
   margin-bottom: 30px !important
 }
 .container{
   width: 100%;
 }
 .card{
   width: 100%;
 }
 .imagewrap{
   width: 100%;
 }
 .faq-container{
   width: 100%;
   padding:0.5rem;
 }
 .team{
  width:100%;
  font-size: 0.8em;
}
.logos{
  width: 100%;
  gap:10px;
  flex-direction: column;
}
.Supervisor img{
  width:30%;
}
.Organizer img{
  width:30%;
}
.Executive img{
  width:30%;
}
.Collaborator{
  width:100%;
  margin-top:10px;
}
.Collaborator img{
  width:30%;
}
}

 @media only screen and (min-width:2560px){
  .pulse{
    width:400px;
    height:400px;
    left:62%;
    top:30%;
  }
  .about_fvl{
    font-size:1.5em;
  }
  .google-map{
    height: 800px;
  }
  .pre-sale{
    font-size:1.5em;
  }
  .early-bird{
    font-size: 1.5em;
  }
  .notice{
    font-size: 1.2em;
  }
  .table{
    font-size: 1.2em;
  }
 }
 @media only screen and (min-width:1920px){
  .pulse{
    width:400px;
    height:400px;
    left:60%;
    top:30%;
  }
 }
 @media only screen and (min-width:3840px) {
  .jumping-word{
    font-size:2em;
  }
  .dropbtn{
    width:10rem;
    height:6rem;
    font-size:2rem;
  }
  .pulse{
   width: 650px;
   height: 650px;
   left:62%;
   top:25%;
  }
    .about_fvl{
    font-size: 2em;
   }
   .title_background{
    width: 14rem;
    font-size: 3rem;
   }
   .location{
    font-size: 2em;
   }
   .google-map{
    height: 1000px;
   }
   .notice{
    font-size:2em;
   }
   .table{
    font-size:1.6em;
   }
   .early-bird{
    font-size: 2em;
   }
   .pre-sale{
    font-size: 2em;
   }
   .container:not(.is-max-desktop):not(.is-max-widescreen){
    max-width:2560px;
   }
   .card{
    width:600px;
    height:600px;
   }
   .team{
    width:60%;
    font-size: 2em;
   }
   .logos{
    transform:scale(1.5);
    display:flex;
    justify-content: center;
   }
 }
// .early-bird.clicker{
// .ticket-price{
//   animation: test 5s linear;
// }
// @keyframes test{
//   0% {opacity: 0;}

//   100%{opacity:1}
// }

// }


// -------------slider2----------------


</style>

