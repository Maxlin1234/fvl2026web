<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<!-- eslint-disable max-len -->
<template>
  <section>
    <head>
      <title>Fvl 2024</title>
      <meta charset="UTF-8">
      <meta
        name="viewport"
        content="width=device-width"
      >
    </head>
    <div
      v-if="loading"
      class="loading"
    >
      <loading-page />
<loading-page/>
    </div>
    <section
      class="home"
      style="background-color:blue;overflow:hidden;position:relative;"
    >
    <!-- <nav-bar></nav-bar> -->
    <!-- <info-bar></info-bar> -->
    <language-switch v-model="isEnglish"></language-switch>
      <div
        class="banner-back"
        style="filter:blur(30px);transform: scale(1.2);
        position:fixed;z-index:0;"
      ><banner-background /></div>
      <div class="fixed-list">
        <div class="dropdown">
          <button
            class="dropbtn"
            @click="change_en"
          >EN</button>
        </div>
      </div>
      <div class="banner-box">
        <div class="banner">
          <div class="banner-img">
            <img
              src="../assets/l-img.png"
              style="position:absolute;bottom:5%;z-index: 3;left:5%;width:10%;"
            >
            <img
              src="../assets/2024banner.png"
              style="position: absolute; bottom: 0; width: 100vw; z-index: 2;"
            >
            <div class="pulse">
              <span style="--i:0;" />
              <span style="--i:1;" />
              <span style="--i:2;" />
              <span style="--i:3;" />
              <span style="--i:4;" />
              <span style="--i:5;" />
              <span style="--i:6;" />
            </div>
          </div>
        </div>
        <div id="title-img">
          <img src="../assets/t-img.png">
        </div>
        <div id="date-img">
          <img src="../assets/d-img.png">
        </div>
      </div>
      <div
        class="about-background"
        style="display: flex;flex-direction: column;
        align-items: center;justify-content: center;"
      >
        <div class="fvl_about">
          <div class="about_fvl">
            <p>自2020年起，C-LAB 未來視覺實驗室持續推動實驗展演計畫「FUTURE VISION LAB」，
              遂以數位實驗建築著手打造穹形場域（DOME），以探索科技媒體的視覺極限為目標，過去四年已進行百餘件作品展演。
              於2023年在文化部支持下，開啟軟硬體升級計畫，尺寸突破過往尺度，
              打造直徑15公尺、全臺唯一巨型移動式戶外沉浸式體驗空間「C-LAB穹頂劇場」。
              影音軟硬體歷經數次迭代開發，克服球形曲面投影的校正、融接、對位、播放控制與影像前製等多重技術之複雜度，
              沉浸影像投影系統總運算可達 8K*8K超高解析度；內部以雙層結構隱藏影音設備，
              客製新型態透聲投影膜片並與臺灣聲響實驗室攜手合作建構更完善的25.4聲道環繞聲場環境。
              未來視覺實驗室逐年針對穹形沉浸式場域打造接軌國際規格的創作環境，不僅展現臺灣高量能的創造力，
              也讓觀眾享受更高品質的沉浸式感官內容與體驗。</p>
            <p>今年度「FUTURE VISION LAB 2024」，
              於11月1日起至12月22日，連續8個周末，
              展映來自德國、波士尼亞與赫塞哥維納、澳洲、日本、韓國、中國及臺灣等各國精彩作品，
              共計15檔節目和3場推廣講座及工作坊；同時未來視覺實驗室積極與國內外單位串聯與合作，呈現展覽、播映和現場Live 演出等不同形式，
              一次掌握穹頂場域最新的創作內容，與創作者們一起潛入沉浸式作品帶來的感官體驗之中。</p>
          </div>
        </div>
        <div class="fvl_tickets">
          <div class="exibition_info">
            <div class="sales_info">
              <div class="about_event"><br>
                <div class="title_background">
                  <p style="font-weight: 700;margin-bottom:0 !important;">地點</p>
                </div>
                <div class="location">
                  <p>C-LAB穹頂劇場(東草坪) <br>台北市大安區建國南路一段177號</p>
                </div><br>
              </div>
              <div
                id="map"
                class="google-map"
              />
            </div>
            <div class="title_background">
              <p style="font-weight: 700;margin-bottom:0 !important;">入場方式</p>
            </div>
            <div class="tickets">
              <div class="ticket_buttons">
                <button
                  type="button"
                  class="early-bird"
                  :class="{'active':link == 'early-bird'}"
                  @click.prevent="link = 'early-bird'"
                ><p style="font-size:1.3em;margin-bottom: 0 !important;">
                  播映及現場演出</p></button>
                <button
                  type="button"
                  class="pre-sale"
                  :class="{'active':link == 'pre-sale'}"
                  @click.prevent="link = 'pre-sale'"
                  @click="plus()"
                ><p style="font-size:1.3em;
                margin-bottom: 0 !important;">展覽</p></button>
              </div>

              <div class="tickets_info">
                <div v-if="link == 'early-bird'">
                  <div class="notice">
                    <div
                      class="sales-enter-animate"
                      style="width:100%;"
                    >
                      <p>
                        <b> ▶ </b> 每場次皆需事先索票，一人一票憑票入場。<br>
                        <b> ▶ </b> 每場播映/現場演出於開演前10分鐘開放入場，並不開放遲到觀眾入場。<br>
                        <b> ▶ <u style="color: #fe225b">每週一將開放隔週節目索票</u>
                        </b>，節目索票資訊請鎖定<br><a
                          href="https://www.facebook.com/profile.php?id=100079147550663"
                          style="color: blue;font-weight:600;"
                        >「C-LAB 科技媒體實驗平台」臉書</a> 或<a
                          href="https://www.accupass.com/organizer/detail/1807130939251014675956"
                          style="color:blue;font-weight:600;"
                        >「臺灣當代文化實驗場C-LAB」Accupass</a> 。<br>
                        <b> ▶ </b> 詳細節目資訊請至「FUTURE VISION LAB」官網查詢：<a
                          href="https://fvl.clab.org.tw/fvl-fest-2024/ "
                          style="color: blue;font-weight:600;"
                        >https://fvl.clab.org.tw/fvl-fest-2024/ </a></p> <br>
                    </div>
                  </div>
                  <hr style="background-color:black;height:0.1px; border:none;opacity: 0.5;">
                  <div class="notice">
                    <p style="font-size:1.2rem;font-weight:bolder;color: black;width:100%;padding:0;margin-bottom:1rem;">注意事項</p>
                    <p><b>◉</b>   演出內容有部分包含強烈閃光，敬請斟酌入場。<br>
                      <b>◉</b>   因活動場地為鏡面地板，建議穿著「褲裝」進場觀賞。<br>
                      <b>◉</b>   因場內空間有限，禁止鋪設野餐墊、椅子，若有其他需求，請洽前台工作人員協助。<br>
                      <b>◉</b>   播映過程可拍照、即時動態拍攝，但禁止使用閃光燈。<br>
                      <b>◉</b>   主辦單位保有調整與變更活動之權利。</p>
                  </div>
                </div>

                <div v-if="link == 'pre-sale'">
                  <div class="notice">
                    <div
                      class="sales-enter-animate"
                      style="width:100% ;"
                    >
                      <p>展覽作品有：<br>11/2 《FUTURE VISION LAB 2024 作品輪映》<br>11/23-24《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》<br>12/13-15 C-LAB Future Vision Lab 自製作品<br><br>
                        <b> ▶ </b>採現場排隊依序入場，場內人數額滿為止。<br>
                        <b> ▶ </b>場內人數上限為100人，若額滿請等候場內觀眾離場後，依現場人數管制進場。<br>
                        <b> ▶ </b> 開放入場時若排隊人員不在現場即視同放棄，需重新排隊依序等候入場。。
                      </p>
                    </div>
                  </div>
                  <hr style="background-color:black;height:0.1px; border:none;opacity: 0.5;">
                  <div class="notice">
                    <p style="font-size:1.2rem;font-weight:bolder;color: black;width:100%;padding:0;margin-bottom:1rem;">注意事項</p>
                    <p><b>◉</b>   演出內容有部分包含強烈閃光，敬請斟酌入場。<br>
                      <b>◉</b>   因活動場地為鏡面地板，建議穿著「褲裝」進場觀賞。<br>
                      <b>◉</b>   因場內空間有限，禁止鋪設野餐墊、椅子，若有其他需求，請洽前台工作人員協助。<br>
                      <b>◉</b>   播映過程可拍照、即時動態拍攝，但禁止使用閃光燈。<br>
                      <b>◉</b>   主辦單位保有調整與變更活動之權利。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
          <div class="banner-back" style="filter:blur(30px);transform: scale(1.2);">
               <banner-background></banner-background>
               </div> -->

      <!-- <div class="previewbox" style="display: flex;flex-direction: column;">
                            <article class="preview" style="width:80%;height:auto;">

                                  <div class="preview__thumbnail"></div>
                                    <div class="preview__text">
                                       <h2 class="preview__text__header" style="color: white;">FUTURE VISION LAB</h2>
                                          <p class="preview__text__description" style="color: white;"> Upgrade to premium speakers that are phenomenally built to deliver trulyremarkable sound.</p>
                                           <button class="preview__text__link__btn default-btn">Read More</button>

                                    </div>

                             </article>

                         <article class="preview2"  style="width:80%;height:auto;">
                           <div class="preview__thumbnail"></div>
                              <div class="preview__text">
                                 <h2 class="preview__text__header" style="color: white;">FUTURE VISION LAB</h2>
                                      <p class="preview__text__description" style="color: white;">
                                         Upgrade to premium speakers that are phenomenally built to deliver truly
                                         remarkable sound.
                                     </p>
                                  <router-link to="2018" class="preview__text__link">
                                      <button class="preview__text__link__btn default-btn">
                                         Read More
                                      </button>
                                  </router-link>
                              </div>
                          </article>

                          <article class="preview3"  style="width:80%;height:auto;">
                             <div class="preview__thumbnail"></div>
                                 <div class="preview__text">
                                    <h2 class="preview__text__header" style="color: white;">FUTURE VISION LAB</h2>
                                       <p class="preview__text__description" style="color: white;">
                                         Upgrade to premium speakers that are phenomenally built to deliver truly
                                         remarkable sound.
                                       </p>
                                     <router-link to="2018" class="preview__text__link">
                                          <button class="preview__text__link__btn default-btn">
                                            Read More
                                          </button>
                                     </router-link>
                                  </div>
                          </article>

                      </div> -->
      <div class="program-list">
        <div class="title_background"> <p style="font-weight: 700;margin-bottom:0 !important;">節目場次</p></div>
        <!-- //// -->
        <!-- 10月本週 -->
        <div
          v-if="ShowOctoberweek"
          class="table"
        >
          <table style="width: 100%; border-collapse:collapse!important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >10/22(Tue.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;width: 100%;"
              >黃子祐｜《沉浸影像工作坊》Part I</td>
            </tr>

            <tr style="border-end-end-radius: 25px;">
              <th
                scope="col"
                style="border-left:none;border-bottom:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >10/25(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >13:30、17:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;"
              >黃子祐｜《沉浸影像工作坊》Part II</td>
            </tr>
          </table>
        </div>
        <!-- //////// -->

        <!-- 11月第一週 -->
        <div
          v-if="ShowNovemberfirstweek && ShowOctober"
          class="table"
        >
          <table style="width:100%;border-collapse:collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >11/2(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >14:00-22:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >《FUTURE VISION LAB 2024 作品輪映》
                *本日活動響應台北市主辦之「白晝之夜」，詳細入場方式請見主辦單位公告與說明FUTURE VISION LAB 2024.</td>
            </tr>

            <!-- 11/3 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;"
              >11/3(Sun.)</th>
            </tr>
            <tr style="">
              <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                Ina CHEN x Calvin SIN x LU Te-Hsing<br>｜4993 Feet Under <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);border-bottom:none;"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>

            </tr>
            <!-- </tr> -->
          </table>
        </div>
        <!-- /////// -->

        <div
          v-if="ShowOctober"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >10月工作坊</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color:white"
              >10/22(Tue.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;width: 100%;"
              >黃子祐｜《沉浸影像工作坊》Part I</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >10/25(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >13:30、17:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;"
              >黃子祐｜《沉浸影像工作坊》Part II</td>
            </tr>
          </table>
        </div>

        <div
          v-if="ShowOctober"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >11月節目</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >11/2(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >14:00-22:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >《FUTURE VISION LAB 2024 作品輪映》<br><p style="color:orange;background-color:transparent;">*響應台北市主辦之「白晝之夜」，本日延長開放時間</p>
              </td>
            </tr>

            <!-- 11/3 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/3(Sun.)</th>
            </tr>
            <tr>
              <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/10 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/10(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins <br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

            </tr>
            <!-- </tr> -->

            <!-- 11/15 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/15(Fri.)</th>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》（現場演出）｜40 mins</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/16 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/16(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins <br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins </td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins <br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》｜40 mins</td>

            </tr>
            <!-- </tr> -->
            <!-- 11/17 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/17(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》<br>場次一｜陳蘇楊、冼筱然、盧德昕、謝爾蓋．普羅科菲耶夫、蔡奇宏（主持）</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:15</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》<br>場次二｜莊禾、蕭力綺、吳秉聖、吳克軍、蔡奇宏（主持）</td>
            </tr>
            <!--
                           </tr> -->

            <!-- 11/22 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/22(Fri.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins </td>
            </tr>
            <!-- </tr> -->

            <!-- 11/23 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/23(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽） </td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/24 -->

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/24(Sun.)</th>
            </tr>

            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- </tr> -->
            <!-- 11/29 -->

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/29(Fri.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">20:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- </tr> -->
            <!-- 11/30 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >11/30(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
            <!-- </tr> -->
          </table>
        </div>

        <div
          v-if="ShowOctober"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >12月節目</td>
            </tr>

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/1(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>

            </tr>
            <!-- </tr> -->

            <!-- 12/6 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/6(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>

            <!-- 12/7 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/7(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins
              </td>
            </tr>
            <!-- 12/13 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/13(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >16:00-20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              > C-LAB Future Vision Lab 自製作品</td>
            </tr>
            <!-- 12/14 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/14(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >15:00-19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >C-LAB Future Vision Lab 自製作品</td>
            </tr>
            <!-- 12/15 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color: blue;color: white;"
              >12/15(Sun.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >15:00-19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >C-LAB Future Vision Lab 自製作品</td>
            </tr>
            <!-- 12/21 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/21(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>
            <!-- </tr> -->
            <!-- 12/22 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >12/22(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
              <td style="vertical-align:middle;text-align: left;">《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>

            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">  《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins  </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
              <td style="vertical-align:middle;text-align: left;border: none; border-end-end-radius: 25px;width:100%"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins </td>
            </tr>
            <!-- </tr>  -->
          </table>
        </div>

        <!-- //// -->
        <!--10月結束 ------------------------------------------------------------------------------------------------------------------------------------------------ -->
        <!-- 11月第一週 -->
        <div
          v-if="ShowNovemberfirstweek && ShowNovember"
          class="table"
        >
          <table style="width:100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >11/2(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >14:00-22:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >《FUTURE VISION LAB 2024 作品輪映》
                *本日活動響應台北市主辦之「白晝之夜」，詳細入場方式請見主辦單位公告與說明FUTURE VISION LAB 2024.</td>
            </tr>

            <!-- 11/3 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;"
              >11/3(Sun.)</th>
            </tr>
            <tr style="">
              <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                Ina CHEN x Calvin SIN x LU Te-Hsing<br>｜4993 Feet Under <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);border-bottom:none;"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>

            </tr>
            <!-- </tr> -->
          </table>
        </div>
        <!-- /////// -->
        <!-- 11月第二週 -->
        <div
          v-if="ShowNovembersecondweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>

            <!-- 11/10 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-bottom:none;border-end-start-radius:25px;"
              >11/10(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under  <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome <br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;border-end-end-radius:25px;border-bottom:none;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
          </table>
        </div>
        <!-- ////// -->
        <!-- 第三週 -->
        <div
          v-if="ShowNovemberthirdweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 11/15 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/15(Fri.)</th>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》（現場演出）｜40 mins</td>
            </tr>
            <!-- 11/16 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/16(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius: 25px;">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》｜40 mins</td>
            </tr>
            <!-- 11/17 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom: none;"
              >11/17(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom:none;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins </td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:30</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;border-bottom: none;">《未來視覺 X DOME— 藝術家分享講座》場次一｜莊禾、蕭力綺、吳秉聖、吳克軍、蔡奇宏（主持）</td>
            </tr>
          </table>
        </div>
        <!-- ////////// -->
        <!-- 第四週 -->
        <div
          v-if="ShowNovemberfourthweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>

            <!-- 11/22 -->
            <!-- <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                           </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins  </td>
                             </tr> -->
            <!-- </tr> -->

            <!-- 11/23 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/23(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;border-end-end-radius:25px;border-bottom:none; ">長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/24 -->

            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-bottom:none;border-end-start-radius:25px;"
              >11/24(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;border-end-end-radius:25px;border-bottom:none;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <!-- </tr> -->
          </table>
        </div>
        <!-- ///////// -->
        <!-- 第五週 -->
        <!-- 11月 -->
        <div
          v-if="ShowNovemberfifthweek || ShowDecemberfirstday"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 11/29 -->
            <!--
                           <tr>
                             <th rowspan="3" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/29(Fri.)</th>
                           </tr>
                               <tr>
                                 <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
                                  <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
                               </tr>

                               <tr>
                                 <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">20:00</td>
                                 <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
                               </tr> -->
            <!-- </tr> -->
            <!-- 11/30 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/30(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius:25px;">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius: 25px;border-bottom: none;"
              >12/1(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);border-end-end-radius:25px;border-bottom:none;">吳承儒｜《認夢》（現場演出）｜15 mins</td>

            </tr>

            <!-- </tr> -->
          </table>
        </div>
        <!-- ///////// -->

        <!-- 11月顯示全部節目 -->

        <div
          v-if="ShowNovember"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >10月工作坊</td>
            </tr>
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color:white"
              >10/22(Tue.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;width: 100%;"
              >黃子祐｜《沉浸影像工作坊》Part I</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >10/25(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >13:30、17:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;border: none;width: 100%;border-end-end-radius: 25px;"
              >黃子祐｜《沉浸影像工作坊》Part II</td>
            </tr>
          </table>
        </div>

        <div
          v-if="ShowNovember"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >11月節目</td>
            </tr>

            <!-- <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">11/2(Sat.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-22:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《FUTURE VISION LAB 2024 作品輪映》
                           *本日活動響應台北市主辦之「白晝之夜」，詳細入場方式請見主辦單位公告與說明FUTURE VISION LAB 2024 </td>
                           </tr> -->

            <!-- 11/3 -->
            <!-- <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/3(Sun.)</th>
                           </tr>
                           <tr style="">
                             <td style="border-top: none; vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                             Ina CHEN x Calvin SIN x LU Te-Hsing<br>｜4993 Feet Under <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
                         </tr> -->

            <!-- 11/10 -->
            <!-- <tr>
                             <th rowspan="5" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/10(Sun.)</th>
                         </tr>
                           <tr>
                             <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
                             <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins
                             Ina CHEN x Calvin SIN x LU Te-Hsing｜4993 Feet Under  <br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>
                           </tr>

                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
                             <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome <br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 17:00</td>
                             <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>莫爾托維奇＆希魯達｜《印度的他方：奧德賽》｜15 mins</td>

                           </tr>
                           <tr>
                             <td style="vertical-align:middle;white-space:nowrap;"> 18:00</td>
                             <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins CHUANG Ho｜Demo: Dome<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
                         </tr> -->

            <!-- 11/15 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/15(Fri.)</th>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》（現場演出）｜40 mins</td>

            </tr>

            <!-- </tr> -->

            <!-- 11/16 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/16(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins </td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》｜40 mins</td>

            </tr>
            <!-- </tr> -->
            <!-- 11/17 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/17(Sun.)</th>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:30</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》場次一｜莊禾、蕭力綺、吳秉聖、吳克軍、蔡奇宏（主持）</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/22 -->
            <!-- <tr>
                             <th rowspan="2" scope="col" style="vertical-align:middle;background-color:blue;color: white;">11/22(Fri.)</th>
                           </tr>
                             <tr>
                               <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
                               <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins  </td>
                             </tr> -->
            <!-- </tr> -->

            <!-- 11/23 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/23(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <!-- </tr> -->

            <!-- 11/24 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/24(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >11/30(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius:25px;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
            <!-- </tr> -->
          </table>
        </div>

        <div
          v-if="ShowNovember"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style="border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >12月節目</td>
            </tr>

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/1(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>

            </tr>
            <!-- 12/6 -->

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/6(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>
            <!-- 12/7 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/7(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>
            <!-- 12/11 -->
            <tr>
              <th
                rowspan="3"
                style="border-left:none;vertical-align:middle;background-color:blue;color:white;"
              >12/11(Wed.)</th>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- 12/12 -->
            <tr>
              <th
                rowspan="3"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/12(Thu.)</th>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- 12/13 -->
            <!-- 12/14 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/14(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >15:00-20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >場次待公布</td>
            </tr>
            <!-- 12/15 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color: blue;color: white;"
              >12/15(Sun.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"
              >15:00-19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"
              >場次待公布</td>
            </tr>
            <!-- 12/21 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/21(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>
            <!-- 12/22 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/22(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
              <td style="vertical-align:middle;text-align: left;border-end-end-radius: 25px;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>
            <!-- 12/27 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/27(Fri.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/28 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color:white;"
              >12/28(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/29-->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;"
              >12/29 (Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>

          </table>
        </div>
        <!-- 12月第一週 -->
        <div
          v-if="ShowDecemberfirstweek"
          class="table"
        >
          <table style="  width:100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 12/6 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-bottom:none;"
              >12/6(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins C-LAB x KAMS｜Future Vision Party #2 (Live Performance)</td>
            </tr>
            <!-- 12/7 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;"
              >12/7(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;border-end-end-radius: 25px;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>
          </table>
        </div>
        <!-- ////////////// -->
        <!-- 第二週 -->
        <div
          v-if="ShowDecembersecondweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">

            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 12/12 -->
            <tr>
              <th
                rowspan="3"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/12(Thu.)</th>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- 12/14 -->
            <tr>
              <th
                rowspan="7"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/14(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》場次二｜陳蘇楊、冼筱然、盧德昕、謝爾蓋．普羅科菲耶夫、蔡奇宏（主持）
              </td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins
              </td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 程威誌 x 比林 x 劉家禹｜《Module IN DOME》(Screening)｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">  陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>
            </tr>

            <!-- 12/15 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom: none;"
              >12/15(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 程威誌 x 比林 x 劉家禹｜《Module IN DOME》(Screening)｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);border-end-end-radius: 25px;border-bottom: none;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
          </table>
        </div>
        <!-- ////////////// -->
        <!-- 第三週 -->

        <div
          v-if="ShowDecemberthirdweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 12/21 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/21(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>
            <!-- 12/22 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/22(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>

            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>
          </table>
        </div>
        <!-- ------------------------------------ -->
        <div
          v-if="ShowDecemberfourthweek"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >本週節目</td>
            </tr>
            <!-- 12/27 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/27(Fri.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/28 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-bottom:none;"
              >12/28 (Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/29 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color:white;border-end-start-radius:25px;border-bottom:none;"
              >12/29 (Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;border-end-end-radius:25px;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
          </table>
        </div>
        <!-- ////////////// -->

        <div
          v-if="ShowDecember"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style="border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight:700;font-size: 1.2rem;"
              >10月</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color:white;border-bottom:none;"
              >10/22(Tue.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;width: 100%;"
              >黃子祐｜《沉浸影像工作坊》Part I</td>
            </tr>

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >10/25(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >13:30、17:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;border: none;width:100%;border-end-end-radius: 25px;"
              >黃子祐｜《沉浸影像工作坊》Part II</td>
            </tr>
          </table>
        </div>

        <div
          v-if="ShowDecember"
          class="table"
        >
          <table style="  width:100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style=" border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >11月節目</td>
            </tr>
            <!-- 11/15 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/15(Fri.)</th>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》（現場演出）｜40 mins</td>

            </tr>

            <!-- 11/16 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/16(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins </td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB x 關鍵路徑｜ 《我記得住機器記住我記住的》｜40 mins</td>

            </tr>
            <!-- 11/17 -->
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/17(Sun.)</th>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-17:30</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》場次一｜莊禾、蕭力綺、吳秉聖、吳克軍、蔡奇宏（主持）</td>
            </tr>
            <tr>
              <th
                rowspan="6"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/23(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>程威誌 x 比林 x 劉家禹｜《Module IN DOME》（互動裝置版）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">19:00</td>
              <td style="vertical-align:middle;text-align: left;">長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <!-- 11/24 -->

            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >11/24(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">16:00</td>
              <td style="vertical-align:middle;text-align: left;">程威誌 x 比林 x 劉家禹｜《Module IN DOME》｜15 mins<br>陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:00</td>
              <td style="vertical-align:middle;text-align: left;">莊禾 x 蕭禹琦｜《影像雜技》｜9 mins<br>長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins</td>
            </tr>
            <!-- </tr> -->
            <!-- 11/30 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius: 25px;border-bottom:none;"
              >11/30(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">19:00</td>
              <td style="vertical-align:middle;text-align: left;border: none;border-end-end-radius: 25px;background-color:rgb(231 255 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>
          </table>
        </div>

        <div
          v-if="ShowDecember"
          class="table"
        >
          <table style="  width: 100%; border-collapse: collapse !important;margin:0;">
            <tr>
              <td
                colspan="4"
                style="border: none;border-top-left-radius: 25px;border-top-right-radius: 25px; padding:5px;background-color: #000;color: #ffffff;height:50px;vertical-align:middle;font-weight: 700;font-size: 1.2rem;"
              >12月節目</td>
            </tr>

            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/1(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color: rgb(231, 255, 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color: rgb(231, 255, 255);">吳承儒｜《認夢》（現場演出）｜15 mins</td>

            </tr>
            <!-- 12/6 -->

            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/6(Fri.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>
            <!-- 12/7 -->
            <tr>
              <th
                scope="col"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/7(Sat.)</th>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:30</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >C-LAB x KAMS｜《未來視覺派對 #2》｜60 mins</td>
            </tr>
            <!-- 12/11 -->
            <tr>
              <th
                rowspan="3"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/11(Wed.)</th>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- 12/12 -->
            <tr>
              <th
                rowspan="3"
                style="border-left:none;vertical-align:middle;background-color:blue;color: white;"
              >12/12(Thu.)</th>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >19:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <tr>
              <td
                scope="col"
                style="vertical-align:middle;white-space:nowrap;"
              >20:00</td>
              <td
                colspan="2"
                scope="col"
                style="vertical-align:middle;text-align: left;"
              >蕭力綺｜《虛擬的共鳴》（現場演出）｜25 mins</td>
            </tr>
            <!-- 12/13 -->
            <!-- <tr>
                             <th scope="col" style="border-left:none;vertical-align:middle;background-color:blue;color: white;">12/13(Fri.)</th>
                             <td scope="col" style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00-20:00</td>
                             <td colspan="2" scope="col" style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">C-LAB Future Vision Lab 自製作品</td>
                           </tr> -->
            <!-- 12/14 -->
            <tr>
              <th
                rowspan="7"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/14(Sat.)</th>
            </tr>

            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">14:00-15:15</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">《未來視覺 X DOME— 藝術家分享講座》場次二｜陳蘇楊、冼筱然、盧德昕、謝爾蓋．普羅科菲耶夫、蔡奇宏（主持）
              </td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 程威誌 x 比林 x 劉家禹｜《Module IN DOME》(Screening)｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 19:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">  陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>
            </tr>

            <!-- 12/15 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/15(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">15:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">長屋和哉 x 阿里．瑪哈穆．迪米萊爾 x 莫里斯．瓊斯｜《磐座》｜27 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins
              </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);">16:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 程威誌 x 比林 x 劉家禹｜《Module IN DOME》(Screening)｜15 mins<br>莊禾 x 蕭禹琦｜《影像雜技》｜9 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 17:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);"> 謝爾蓋．普羅科菲耶夫｜《全球烏托邦中的在地反烏托邦》｜ 21 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
            <tr>
              <td style="vertical-align:middle;white-space:nowrap;background-color:rgb(231 255 255);"> 18:00</td>
              <td style="vertical-align:middle;text-align: left;background-color:rgb(231 255 255);">陳蘇楊 x 冼筱然 x 盧德昕｜《油井之殤：鯨落4993尺》｜15 mins<br>C-LAB 未來視覺實驗室自製節目｜8 mins</td>

            </tr>
            <!-- 12/21 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/21(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">15:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;">財團法人數位藝術基金會｜《諸神黃昏》｜20 mins</td>
            </tr>
            <!-- </tr> -->
            <!-- 12/22 -->
            <tr>
              <th
                rowspan="5"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/22(Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">14:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">15:30</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>

            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">17:00</td>
              <td style="vertical-align:middle;text-align: left;"> 《沉浸式影音工作坊－清華大學藝術學院學士班 / 科藝所成果呈現》｜60 mins </td>
            </tr>

            <tr>
              <td style="vertical-align:middle;white-space:nowrap;">18:30</td>
              <td style="vertical-align:middle;text-align: left;border-end-end-radius: 25px;"> 《沉浸式影音工作坊－實踐大學媒傳系成果呈現》｜60 mins</td>
            </tr>
            <!-- </tr>  -->
            <!-- 12/27 -->
            <tr>
              <th
                rowspan="2"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;"
              >12/27(Fri.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/28 -->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color:white;"
              >12/28(Sat.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>
            <!-- 12/29-->
            <tr>
              <th
                rowspan="3"
                scope="col"
                style="vertical-align:middle;background-color:blue;color: white;border-end-start-radius:25px;border-bottom:none;"
              >12/29 (Sun.)</th>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">12:00-18:00</td>
              <td style="vertical-align:middle;text-align: left;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（展覽）</td>
            </tr>
            <tr>
              <td style=" vertical-align:middle;white-space:nowrap;">19:30</td>
              <td style="vertical-align:middle;text-align:left;border-end-end-radius:25px;border-bottom:none;">知覺野人｜《人造太陽與電覺修羅_人造神通與機械肉身_大語言模型與沉浸式生成系統開發計畫》（現場演出）｜60 mins</td>
            </tr>

          </table>
        </div>

      </div>

      <!--12月結束 ------------------------------------------------------------------------------------------------------------------------------------------------ -->

      <!-- <section class="grids" style="width: 100vw;height: auto;background-color: blue;padding:4rem;"> -->
      <div class="grid_title">
        <div class="title_background">
          <p style="margin-bottom: 0 !important;">作品</p>
        </div>

        <!-- <div class="grids_en" style="text-transform: uppercase;color:#ff8c9f;font-size:10vw;font-family:Impact, fantasy;">2024 WORKS</div> -->

        <div class="container">
          <div
            class="row grid max-margin"
            style="margin: 0 auto;justify-content: center;position: relative;"
          >
            <div
              v-for="(item,index) in orderedProducts"
              :key="item.id"
              class="col-md-6 card mb-80"
            >
              <div class="imagewrap">
                <div class="imagewrap-background" />
                <img :src="'https://unzip-clab-api.clab.org.tw/'+item.photo_1">
              </div>
              <div class="wordwrap">
                <router-link
                  target="_blank"
                  :to="{
                    name:'Aboutwork',
                    params:{
                      id:index,
                      workId:item.work_id,
                    }
                  }"
                >
                  <p style="color: aliceblue;">{{ item.work_zh.title }}</p>
                </router-link>
              </div>

              <div class="grid_title" />
            </div>
          </div>
        </div>

        <!-- <div class="title_background" style="margin-top: 1em"> -->
        <div
          class="title_background"
          style="margin-top:2em;"
        ><p style="font-weight:700;margin-bottom:0 !important;">製作團隊</p></div>
        <!-- <p style="margin-bottom: 0 !important;color:white;text-align: left;margin-top: 6em;">製作團隊</p> -->
        <!-- </div> -->
        <div class="team">

          <ul style="width:50%">
            <li>計畫主持人 - 蔡奇宏</li>
            <li>節目統籌 - 廖苑喻</li>
            <li>技術統籌 - 蔡奇宏</li>
            <li>技術執行 - 康兆宗、王竣恆</li>
            <li>技術協力 - 林瀚寬</li>
            <li>前期建築概念設計 - 陽明交通大學建築研究所 JHStudio</li>
            <li>建築協力 - achy_made</li>
            <li>聲場設計 - C-LAB 臺灣聲響實驗室</li>
            <li>音響系統統籌 - 黑米創意工作室</li>
          </ul>

          <ul style="width:50%">
            <li>開場影像 - 吳克軍</li>
            <li>進場影像 - 榊原澄人</li>
            <li>主視覺設計 - 林羅伯</li>
            <li>網站設計 - 林瀚寬</li>
            <li>靜態攝影 - 林軒朗、ANPIS FOTO 王世邦</li>
            <li>動態攝影 - 散步映畫有限公司</li>
            <li>宣傳片剪接 - 黃嘉文</li>
            <li>翻譯 - 高慧倩</li>
          </ul>
        </div>

        <!-- <div class="logos" style="width:100%;margin-top:2em;color:white;position:relative;">
                            <img src="imgs/logos.png" style="position:relative;top:0;margin-bottom:1em;">
                          </div> -->

        <!-- ---------logos test------------------->

        <div class="logos">
          <div
            class="Supervisor"
            style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;"
          >
            <img src="../assets/指導單位.svg">
            <img src="../assets/文化部.svg">
          </div>
          <div
            class="Organizer"
            style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;"
          >
            <img src="../assets/主辦單位.svg">
            <img src="../assets/台灣當代文化實驗場.svg">
          </div>
          <div
            class="Executive"
            style="width:100%;height:20%;display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap;"
          >
            <img src="../assets/執行單位.svg">
            <img src="../assets/C-Lab科媒平台.svg">
          </div>
        </div>

        <div class="Collaborator">
          <img src="../assets/合作單位.svg">
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

        <!-- </section> -->
        <!-- <div class="faq_title">
                           <div class="title_background">
                               <p style="margin-bottom: 0 !important;">問與答</p>
                           </div>
                           <div class="grids_en" style="text-transform: uppercase;color:#ff8c9f;font-size:10vw;font-family:Impact, fantasy;">FAQ</div>
                       </div> -->
        <div class="faq-container" />

      </div>
      <!-- <info-bar></info-bar> -->
      <foot-bar2 />
    </section>
  </section>

</template>
<script>
import axios from 'axios';
import '../parallaxedEffect.js';
// import {ThreeJs} from '../components';
import {InfoBar, NavBar} from '../components';
import {gsap} from 'gsap';
import {Anibackground} from '../components';
import {BannerBackground} from '../components';
import {Background} from '../components';
import {BackGround2} from '../components';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {TextPlugin} from 'gsap/dist/TextPlugin.js';
import {defineComponent} from 'vue';
import {NavBar2, FootBar2, LanguageSwitch} from '../components';
import {Loading} from '../components';
// let timer
// const interval = 4000;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Fvlhome',
  components: {
    // 'three-js': ThreeJs,
    'foot-bar2': FootBar2,
    // eslint-disable-next-line vue/no-unused-components
    'nav-bar': NavBar,
    // eslint-disable-next-line vue/no-unused-components
    'nav-bar2': NavBar2,
    // eslint-disable-next-line vue/no-unused-components
    'info-bar': InfoBar,
    // eslint-disable-next-line vue/no-unused-components
    'ani-back': Anibackground,
    'banner-background': BannerBackground,
    // eslint-disable-next-line vue/no-unused-components
    'back-ground': Background,
    'language-switch': LanguageSwitch,
    // eslint-disable-next-line vue/no-unused-components
    'back-ground2': BackGround2,
    'loading-page': Loading,
  },
  beforeRouteLeave(to, from, next) {
    // eslint-disable-next-line max-len
    // this.scrollTop = document.querySelector('.scroll-box').scrollTop; // div内部滚动的
    // eslint-disable-next-line max-len
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line max-len
      // document.querySelector('.scroll-box').scrollTop = vm.scrollTop;// div内部滚动的
      document.body.scrollTop = vm.scrollTop;
    });
  },
  data() {
    return {
      loading: true,
      isEnglish: false,
      showJumpingPage: false,
      customOrder: [3, 4, 1, 11, 2, 7, 10, 6, 5, 9, 8, 0, 13, 12],
      scrollTop: 0,
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
      //  show:0,
      msg: 'A quick-start vue.js frontend development template.',
      imgs: [
        {type: 'img', src: './imgs/1.jpeg'},
      ],
      map: null,
      marker: null,
      // 經緯度
      lat: 25.038773,
      lng: 121.540410,
    };
  },

  computed: {
    orderedProducts() {
      // eslint-disable-next-line max-len
      return this.customOrder.map((index) => this.products[index]).filter((item) => item); // 按照自定义顺序重排
    },
    ShowOctober() {
      const currentMonth = new Date().getMonth() + 1;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
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
      return currentMonth === this.startMonth && this.currentDate >= 21 && this.currentDate <= 27;
    },
    ShowOctfinished() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.startMonth && this.currentDate >= 22 && this.currentDate <= 25;
    },
    ShowOctfinishedAll() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.startMonth && this.currentDate > 22 && this.currentDate > 25;
    },
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
      return currentMonth === this.startMonth && this.currentDate >= 28 && this.currentDate <= 31 || currentMonth === this.secondMonth && this.currentDate >= 1 && this.currentDate <= 3;
    },

    ShowNovembersecondweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 4 && this.currentDate <= 10;
    },
    ShowNovemberthirdweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 11 && this.currentDate <= 17;
    },
    ShowNovemberfourthweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 18 && this.currentDate <= 24;
    },
    ShowNovemberfifthweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.secondMonth && this.currentDate >= 25 && this.currentDate <= 30;
    },

    ShowDecember() {
      const currentMonth = new Date().getMonth() + 1;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      return currentMonth === this.endMonth;
    },
    ShowDecemberfirstday() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      return currentMonth === this.endMonth && this.currentDate == 1;
    },
    ShowDecemberfirstweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 2 && this.currentDate <= 7;
    },
    ShowDecembersecondweek() {
      const currentMonth = new Date().getMonth() + 1;
      const currentDate = new Date().getDate();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentMonth = currentMonth;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentDate = currentDate;
      // eslint-disable-next-line max-len
      return currentMonth === this.endMonth && this.currentDate >= 8 && this.currentDate <= 15;
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
  watch: {
    show(nVal, oVal) {
      if (nVal < 0) {
        this.show = this.imgs.length - 1;
      } else if (nVal > this.imgs.length - 1) {
        this.show = 0;
      } else {
        if (oVal < 0) {
          this.transitionName = 'left-in';
        } else if (oVal > this.imgs.length - 1) {
          this.transitionName = 'right-in';
        } else {
          this.transitionName = nVal > oVal ? 'right-in' : 'left-in';
        }
      }
    },
  },
  created() {
    console.log('中文首頁創建');
  },
  mounted() {
    console.log(this.currentMonth);
    console.log(this.$route);
    console.log(this.dateArray);
    // ----------自動輪播----------------
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    this.initMap();
    this.setMarker();
    setTimeout(() => {
      this.loading = false; // 设置加载完成
      this.$nextTick(() => {
        // 在 DOM 更新后执行的操作
        console.log('页面加载完成，可以进行后续操作');
        this.showJumpingPage = true;
      });
    }, 500); // 0.5秒后加载完成
    gsap.to('.fvl_about', {
      scrollTrigger: {
        pin: true,
        trigger: '.about-background',
        start: '26% 70%',
        end: '+=300 0%',
      },
    }),
    gsap.to('.background3', {
      left: -20,
      duration: 1,
      scrollTrigger: {
        trigger: '.fvl_en',
        start: 'bottom 60%',
        end: 'bottom 20%',
        toggleActions: 'play play reverse none',
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
      },
    }),
    gsap.to('.program-list', {
      opacity: 1,
      top: 20,
      duration: 1,
      scrollTrigger: {
        trigger: '.tickets',
        start: 'bottom 60%',
        end: 'bottom 40%',
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
      },
    });

    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works?search=Future%20Vision%20Lab%202024&limit=100', {responseType: 'json'}).then((response) => {
      this.products = response.data;
      console.log(this.products);
    })
        .catch((err) => {
          console.log(err.response);
        });
  },

  methods: {
    change_en() {
      this.$router.push({name: 'Fvlhome_en'}).then(() => {
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
            <p id="firstHeading" class="firstHeading">東草坪</p>
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
    chosework(index) {
      console.log(index);
    },
    plus() {
      console.log('已選擇預售票');
    },

    setShow(index) {
      this.show = index;
    },
    nextShow() {
      this.show++;
    },

    slideCtrl(slidesToShow = 1) {
      if (slidesToShow > 0) {
        const shiftItem = this.slideData.shift();
        this.slideData.push(shiftItem);
        return;
      }
      if (slidesToShow < 0) {
        const shiftItem = this.slideData.pop();
        this.slideData.unshift(shiftItem);
      }
    },

  },
  onMounted() {
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
 border:0;
}
.dropdown{
 display:inline-block;
 z-index:4;
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

// -------------------
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
  display:flex;
  gap:5px;
}
.banner-box{
 height: 100vh;
 width:100vw;
 margin: 0 auto;
 position:relative;
 z-index: 2;
}
.jumping-page{
  width:50%;
  height:30%;
  position:fixed;
  background:linear-gradient(#845be4 10%,#f98e57 90%);
  border-radius:25px;
  top:50%;
  left:50%;
  z-index:999;
  align-items:center;
  transform: translate(-50%, -50%);
  animation-name:ease-in;
  animation-duration:2s;
  overflow: hidden;
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
  font-size:1em;
  z-index:999;
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
top:20%;
z-index:0;
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
  padding: 20px;
  width:10%;
}
.table td{
 background-color: white;
 padding: 20px;
}
@keyframes pulseAnimation{
 100%{
   opacity: 0;
   transform: scale(2);
 }
}
.banner-back{
 top: 0;
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
 // display:block;
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
 display: flex;
 object-fit: cover;
 flex-direction: column;
 align-items: center;
}
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
 display: flex;
 flex-direction: column;
 object-fit: cover;
 align-items: center;
 overflow: hidden;
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
 display: flex;
 flex-direction: column;
 object-fit: cover;
 align-items: center;
 overflow: hidden;
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
 width: 13em;
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
.early-bird::before{
 content: '';
 width: 0;
 height:100%;
 border-radius: 30em;
 position: absolute;
 top: 0;
 left: 0;
 transition: .5s ease;
 display: block;
 z-index: -1;
 background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
}
.early-bird:hover::before{
 width: 13em;
}
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
 background-image: linear-gradient(to right,#2530ff 0%, #ff0606 80%);
 transition: .5s ease;
 display: block;
 z-index: -1;
}
.pre-sale:hover::before{
 width:10em;
}
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
 position: relative;
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
 width:80%;
 height:100vh;
 margin: 0 auto;
 display: flex;
 padding:2rem;
 position: relative;
 z-index: 2;
 flex-direction: column;
 align-items:flex-start;
 justify-content:flex-start;
 padding: 5rem;
 transition: 0.6s ease-in;
 opacity: 0;
 font-size:1.2em;
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
 border: 1px solid rgba(255, 255, 255, 0.3);
 padding: 2em;
 font-size: 1.1em;
 line-height:1.8em;
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
width:100%;
}
.team{
  width:80%;
  height:auto;
  color:white;
  display:flex;
  flex-direction:row;
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
 font-size:1.5em;
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
 width:70%;
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
 margin-top:2rem;
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
 height:auto;
 position:relative;
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
 overflow: hidden;
}
.imagewrap{
 width:100%;
 height:100%;
 position:absolute;
 top:0;
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
 border-radius: 25px;
 width:100%;
 height:100%;
 z-index:3;
 opacity:0;
}
.card:hover{
 .imagewrap-background{
 opacity: 0.8;
 }
 .wordwrap{
   transition: 1s ease-in-out;
   opacity: 1;
   font-size: 1.5em;
   color: white !important;
   position: absolute;
   z-index:999;
 }
 .imagewrap img{
  transition: transform 0.1s ease;
 }
 .imagewrap img{
   transform:scale(1.2);
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
.wordwrap:hover{
 color:rgb(255, 255, 255) !important;
}
.card:after{
 content: '';
   width: 0%;
   height: 1px;
   border: 1.5px rgb(0, 255, 170) solid;
   background-color: #000000;
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
  .jumping-page{
    height:auto;
    width:90%;
  }
  .fixed-list{
    right:5%;
    top:1%
  }
  .dropbtn{
    width: 4rem;;
  }
  .dropdown-content{
    min-width:4rem;
  }
  .dropdown-content a{
    padding-left:0.5rem;
  }
  #title-img{
  top:0;
 }
.banner-box{
 height: 400px;
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
   .dropdown-content{
    min-width:4rem;
  }
  .dropdown-content a{
    padding-left:0.5rem;
  }
  .banner-box{
   width: 100vw;
   height: 290px;
   overflow: hidden;
   margin: 0 auto;
   position: relative;
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
  padding:10px !important;
}
.table td{
  padding:10px !important;
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
  font-size:0.8em;
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
    transform:scale(1.2);
    display:flex;
    justify-content: center;
   }
 }
</style>

