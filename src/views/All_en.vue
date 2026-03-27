<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable max-len -->
<template>
   <section>
   <div id="app" style="scroll-behavior:smooth;background-color:black;">
      <div id="vanta" ref="vantaRef" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
      <div class="content-wrapper" style="position: relative; z-index: 2;">
      <nav-bar></nav-bar>
      <div class="language-switch">
        <button @click="change_zh"  style="  border: 1px solid rgba(255, 255, 255, 0.3);">繁中</button>
      </div>
   <head>
       <meta charset="UTF-8">
       <meta name = "viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie-edge">
   </head>
          <div class="filter gdlr-core-filterer-wrap gdlr-core-js  gdlr-core-item-pdlr gdlr-core-style-text gdlr-core-center-align clearfix" style="color:white !important;">
             <ul style="margin-left: 0;border:1px white solid;padding:15px;display: flex;flex-wrap: wrap;justify-content: center;">
               <li><a href="#" class="active" data-filter="*" @click="type='All'" style="color: white !important;">All</a> <span class="kleanity-separater">/</span></li>
               <!-- <li><a href="#" data-filter=".class1"@click="type='2018'">2018</a> <span class="kleanity-separater">/</span></li>
               <li><a href="#" data-filter=".class2"@click="type='2019'">2019</a> <span class="kleanity-separater">/</span></li> -->
               <li><a href="#" data-filter=".class3"@click="type='2020'">2020</a> <span class="kleanity-separater">/</span></li>
               <li><a href="#" data-filter=".class1"@click="type='2021'">2021</a><span class="kleanity-separater">/</span></li>
               <li><a href="#" data-filter=".class5"@click="type='2022'">2022</a><span class="kleanity-separater">/</span></li>
               <li><a href="#" data-filter=".class6"@click="type='2023'">2023</a><span class="kleanity-separater">/</span></li>
               <li><a href="#" data-filter=".class6"@click="type='2024'">2024</a><span class="kleanity-separater"></span></li>
           </ul>
          </div>

          <Transition name="fade1">
          <template v-if="type === 'All' || type ==='5'">
              <div class="grid-container">

                   <div class="row grid max-margin" style="margin: 0 auto;border: 2px red solid;flex-direction:row!important;flex-wrap:wrap;">
                     <div class="hashtag-container">
                        <div class="hashtag">
                           <div class="hashtag-box"  v-for="(item, index) in hash" style="height: auto;max-width:100%;">
                              <p data-filter=".class1" style="text-wrap: wrap;margin-bottom:0;"@click="type=`${index}`">{{item.name_en}}</p>
                           </div>
                           <!-- <div class="hashtag-box">
                              <p data-filter=".class1"@click="type='2018'">2018</p>
                           </div>
                           <div class="hashtag-box">
                             <p  data-filter=".class2" @click="type='2019'">2019</p>
                           </div> -->
                           <div class="hashtag-box">
                             <p  data-filter=".class3" @click="type='2020'">2020</p>
                           </div>
                           <div class="hashtag-box">
                              <p @click="type='2021'">2021 </p>
                           </div>
                           <div class="hashtag-box">
                              <p @click="type='2022'">2022</p>
                           </div>
                           <div class="hashtag-box">
                             <p @click="type='2023'">2023</p>
                           </div>
                           <div class="hashtag-box">
                             <p @click="type='2024'">2024</p>
                           </div>
                           <div class="hashtag-box">
                             <p>2025</p>
                          </div>
                          <div class="hashtag-box">
                             <p>artist</p>
                           </div>
                           <div class="hashtag-box">
                             <p>keyword</p>
                           </div>
                           <div class="hashtag-box">
                             <p>team</p>
                           </div>
                           <div class="hashtag-box">
                              <p>audio-visual</p>
                           </div>
                           <div class="hashtag-box">
                             <p>party</p>
                           </div>
                       </div>
                    </div>
                     <div class="grids" >
                       <div class="col-md-6 card mb-80" v-for="(item, index) in productsAll">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                              <div class="imagewrap-background"></div>
                                 <img :src ="'https://unzip-clab-api.clab.org.tw/'+item.photo_1" loading="lazy">
                              </div>
                              <div class="wordwrap">
                                 <router-link target="_blank" :to="{
                                    name:'Aboutwork_en_All',
                                    params:{
                                       id:index,
                                       workId:item.work_id,
                                       }
                                     }">
                                    <p style="color:aliceblue;" > {{ item.work_en.title }}</p>
                                 </router-link>
                              </div>
                        </div>
                     </div>
                  </div>
               </div>
       </template>
      </Transition>

          <Transition name="fade1">
          <template v-if="type === 'artist'">
          <div class="grid-container">
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px blue solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products">
                          <div class="imagewrap">
                           <div class="imagewrap-background"></div>
                           <p style="color: aliceblue;">{{item.work_en.title}}</p>
                               <img :src ="item.img"  loading="lazy">
                           </div>
                           <div class="wordwrap">
                             <router-link target="_blank" :to="{
                                name:'Aboutwork_en_All',
                                params:{
                                   id:index,
                                   workId:item.work_id,
                                }
                             }">
                                <p style="color: aliceblue;">{{item.work_en.title}}</p>
                             </router-link>
                           </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition>

       <!-- <Transition name="fade1">
          <template v-if="type === '2018'">
          <div class="grid-container">
            <div class="row grid max-margin" style="margin: 0 auto;border: 2px blue solid;">
                         <div class="grids" >
                           <div class="col-md-6 card mb-80" v-for="(item, index) in products">
                              <div class="imagewrap">
                                   <img :src ="item.img">
                               </div>
                            </div>
                            </div>

                      </div>

          </div>
       </template>
      </Transition> -->

      <!-- <Transition name="fade1">
       <template v-if="type === '2019'">
          <div class="grid-container">
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px yellow solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products">
                          <div class="imagewrap">
                               <img :src ="item.img">
                           </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition> -->

       <Transition name="fade1">
       <template v-if="type === '2020'">
          <div class="grid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px purple solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products2020">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                              <div class="imagewrap-background"></div>
                                 <img :src ="'https://unzip-clab-api.clab.org.tw/'+item.photo_1"  loading="lazy">
                        </div>
                        <div class="wordwrap">
                                 <router-link target="_blank" :to="{
                                    name:'Aboutwork_en_All',
                                    params:{
                                       id:index,
                                       workId:item.work_id,
                                       }
                                     }">
                                    <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                                 </router-link>
                              </div>
                        </div>
                  </div>
          </div>
       </template>
   </Transition>

   <Transition name="fade1">
       <template v-if="type ==='2021'">
          <div class="grid-container">
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px brown solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products2021">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                              <div class="imagewrap-background"></div>
                                 <img :src ="'https://unzip-clab-api.clab.org.tw/'+item.photo_1"  loading="lazy">
                        </div>
                              <div class="wordwrap">
                                 <router-link target="_blank" :to="{
                                    name:'Aboutwork_en_All',
                                    params:{
                                       id:index,
                                       workId:item.work_id,
                                       }
                                     }">
                                    <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                                 </router-link>
                              </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition>

   <Transition name="fade1">
       <template v-if="type === '2022'">
          <div class="girid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px gray solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products2022">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                           <div class="imagewrap-background"></div>
                              <img :src ="'https://unzip-clab-api.clab.org.tw/'+ item.photo_1"  loading="lazy">
                        </div>
                        <div class="wordwrap">
                           <router-link target="_blank" :to="{
                              name:'Aboutwork_en_All',
                              params:{
                              id:index,
                              workId:item.work_id,
                                    }
                              }">
                             <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                           </router-link>
                        </div>
                        </div>
                  </div>
          </div>
       </template>
   </Transition>

   <Transition name="fade1">
       <template v-if="type === '2023'">
          <div class="grid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px orange solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products2023">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                           <div class="imagewrap-background"></div>
                              <img :src ="'https://unzip-clab-api.clab.org.tw/'+ item.photo_1"  loading="lazy">
                        </div>
                        <div class="wordwrap">
                           <router-link target="_blank" :to="{
                              name:'Aboutwork_en_All',
                              params:{
                              id:index,
                              workId:item.work_id,
                                    }
                              }">
                             <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                           </router-link>
                        </div>
                        </div>
                  </div>
          </div>
       </template>
      </Transition>

     <Transition name="fade1">
       <template v-if="type ==='2024' || type ==='1'">
          <div class="grid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px white solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products2024">
                        <div class="imagewrap" @click="navigateToWork(item.work_id)">
                           <div class="imagewrap-background"></div>
                              <img :src ="'https://unzip-clab-api.clab.org.tw/'+ item.photo_1" loading="lazy">
                        </div>
                        <div class="wordwrap">
                           <router-link target="_blank" :to="{
                              name:'Aboutwork_en_All',
                              params:{
                              id:index,
                              workId:item.work_id,
                                    }
                              }">
                             <p style="color: aliceblue;" > {{ item.work_en.title }}</p>
                           </router-link>
                        </div>
                     </div>
                  </div>
          </div>
       </template>
       </Transition>

       <Transition name="fade1">
       <template v-if="type === '徵件作品'">
          <div class="grid-container">
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px orchid solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products">
                          <div class="imagewrap">
                               <img :src ="item.img"  loading="lazy">
                           </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition>

       <Transition name="fade1">
       <template v-if="type === 'SAT'">
          <div class="grid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px orange solid;">
                       <div class="col-md-6 card mb-80" v-for="(item, index) in products">
                          <div class="imagewrap">
                               <img :src ="item.img"  loading="lazy">
                           </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition>

       <Transition name="fade1">
       <template v-if="type === '開場影像'">
          <div class="grid-container">
                  <!-- <div class="row grid max-margin" style="border:1px green solid;margin: 0 auto;"> -->
                   <div class="row grid max-margin" style="margin: 0 auto;border: 5px orangered solid;">
                       <div class="col-md-6 card mb-80" v-for="(itex, index) in products">
                          <div class="imagewrap">
                               <img :src ="item.img"  loading="lazy">
                           </div>
                        </div>
                  </div>
          </div>
       </template>
       </Transition>
   </div>
   <!-- <info-bar></info-bar> -->
   <foot-bar2></foot-bar2>
   </div>
   </section>
   </template>

<script scope>
import axios from 'axios';
import '../google-fonts.css';
import '../kleanity-style-custom.css';
import '../page-builder.css';
import '../style-core.css';
import '../font-awesome.css';
import {InfoBar, FootBar2, NavBar} from '../components';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'All',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'info-bar': InfoBar,
    'foot-bar2': FootBar2,
    'nav-bar': NavBar,
  },
  data() {
    return {
      msg: 'Welcom to FUTURE VISION LAB',
      show: true,
      type: 'All',
      productsAll: [],
      products2020: [],
      products2021: [],
      products2022: [],
      products2023: [],
      products2024: [],
      products: [],
      hash: [],
      productData: {

      },
      seen: false,
      vantaEffect: null,
      isLoaded: false,
    };
  },
  mounted() {
    this.initVanta();
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/8/works?page=0&limit=100', {responseType: 'json'}).then((response) => {
      this.products2020 = response.data.results;
      console.log(this.products2020);
    }).catch((err) => {
      console.log(err.response);
    });
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/4/works?page=0&limit=100', {responseType: 'json'}).then((response) => {
      this.products2021 = response.data.results;
      console.log(this.products2021);
    }).catch((err) => {
      console.log(err.response);
    });
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/7/works?page=0&limit=100', {responseType: 'json'}).then((response) => {
      this.products2022 = response.data.results;
      console.log(this.products2022);
    }).catch((err) => {
      console.log(err.response);
    });

    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/schedules/6/works?page=0&limit=100', {responseType: 'json'}).then((response) => {
      this.products2023 = response.data.results;
      console.log(this.products2023);
    }).catch((err) => {
      console.log(err.response);
    });
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works?search=Future%20Vision%20Lab%202024&limit=100', {responseType: 'json'}).then((response) => {
      this.products2024 = response.data;
      console.log(this.products2024);
    }).catch((err) => {
      console.log(err.response);
    });

    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/works?search=Future%20Vision%20Lab&limit=100', {responseType: 'json'}).then((response) => {
      this.productsAll = response.data;
      console.log(this.productsAll);
    }).catch((err) => {
      console.log(err.response);
    });
    // -------hashtag--------------
    axios.get('https://unzip-clab-api.clab.org.tw/api/v1/keywords/page?page=0&limit=100', {responseType: 'json'}).then((response) => {
      this.hash = response.data.results;
      console.log(this.hash);
    }).catch((err) => {
      console.log(err.response);
    });
  },
  beforeUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  },
  methods: {
    initVanta() {
      this.vantaEffect = NET({
        el: this.$refs.vantaRef,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x20ff96,
        backgroundColor: 0x0,
        points: 8.00,
        maxDistance: 25.00,
        spacing: 20.00,
      });
    },
    change_zh() {
      this.$router.push({name: 'All'}).then(() => {
        window.location.reload();
      });
    },
    onImageLoad(event) {
      this.isLoaded = true;
    },
    navigateToWork(workId) {
      this.$router.push({
        name: 'Aboutwork_en_All',
        params: {
          workId: workId
        }
      });
    },
  },

};

</script>
   <style lang="scss" scoped>
   .language-switch {
     position: fixed;
     right: 8%;
     top: 3%;
     z-index: 9999;
   }

   .language-switch button {
     background-color: transparent;
     color: rgb(255, 255, 255);
     padding: 15px;
     width: 8rem;
     height: 3rem;
     font-size: 1rem;
     font-weight: 600;
     border: none;
     display: flex;
     justify-content: center;
     align-items: center;
     cursor: pointer;
     transition: all 0.3s ease;
   }

   .language-switch button:hover {
     transform: translateY(-2px);
     text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
     box-shadow: 0 0 10px rgba(74, 158, 255, 0.3);
     background-color: rgba(74, 158, 255, 0.1);
   }

   .row{
       width: 100vw;
       height:auto;
       display: flex;
       flex-wrap: wrap;
       gap:20px;
       justify-content:center;
       align-items:flex-start;
       padding: 1rem 1rem;
       flex-wrap: wrap;
   }
   .card {
      position: relative;
      background: transparent;
      width: 300px;
      height: 300px;
      margin: 0 !important;
      padding: 0 !important;
      display: inline-block;
      justify-content: center;
      overflow: visible;
      align-items: center;
      object-fit: cover;
      z-index: 999;
      backdrop-filter: blur(5px);
   }

   .imagewrap {
     position: relative;
     width: 100%;
     height: 100%;
     overflow: hidden;
     cursor: pointer;
   }

   .imagewrap img {
     width: 100%;
     height: 100%;
     position: absolute;
     object-fit: cover;
   }

   .imagewrap-background {
    position: absolute;
     background-color: rgba(0, 0, 0, 0.2);
     mix-blend-mode: multiply;
     width: 100%;
     height: 100%;
     z-index: 3;
     opacity: 0;
     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .wordwrap {
     width: 100%;
     height: auto;
     min-height: 20%;
     opacity: 1;
     padding: 15px 10px;
    position: absolute;
     bottom: 0;
    color: rgb(255, 255, 255) !important;
    font-weight: bolder;
    text-align: center;
    display: flex;
     font-size: 1rem;
    justify-content: center;
    align-items: center;
     z-index: 999;
     text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
     background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
     backdrop-filter: blur(2px);
   }

   .card:hover {
     .imagewrap-background {
       opacity: 0.6;
       background-color: rgba(0, 0, 0, 0.4);
    }

     .wordwrap {
       transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1.5em;
      color: white !important;
      position: absolute;
       z-index: 999;
       text-shadow: 0 0 10px rgba(74, 158, 255, 0.8),
                    0 0 20px rgba(74, 158, 255, 0.6),
                    0 0 30px rgba(74, 158, 255, 0.4);
       background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
       backdrop-filter: blur(4px);
       transform: translateY(0);
       padding: 20px 10px;
    }

     .imagewrap img {
       transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
       transform: scale(1.05);
       filter: brightness(1.1);
    }
   }

   .hashtag-container {
     width: 100%;
      display: flex;
     justify-content: center;
     padding: 1rem;
     margin-bottom: 2rem;
   }

   .hashtag {
     width: 100%;
     max-width: 1200px;
     height: auto;
     border: 1px white solid;
     padding: 1.5rem;
      display: flex;
      flex-direction: row;
     justify-content: center;
     align-items: center;
      flex-wrap: wrap;
     color: white;
     gap: 1rem;
   }

   .hashtag-box {
     border: 1px rgb(255, 255, 255) solid;
     min-width: 80px;
     height: 2.5rem;
     padding: 0.5rem 1rem;
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
     background-color: rgba(0, 0, 0, 0.6);
   }

   .hashtag-box p {
     margin: 0;
     white-space: nowrap;
     font-size: 0.9rem;
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
     color: white;
   }

   .hashtag-box:hover {
     background-color: rgba(255, 255, 255, 0.2);
     transform: translateY(-2px);
     border-color: white;
   }

   .hashtag-box:hover p {
     font-size: 1.1rem;
     color: white;
     text-shadow: 0 0 10px rgba(74, 158, 255, 0.8),
                  0 0 20px rgba(74, 158, 255, 0.6),
                  0 0 30px rgba(74, 158, 255, 0.4);
   }

   .filter ul li .kleanity-separater {
     color: rgba(255, 255, 255, 0.5);
     margin: 0 10px;
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .filter ul li:hover .kleanity-separater {
     color: rgba(255, 255, 255, 0.8);
   }

   .filter ul li a {
     color: white;
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
     font-size: 1rem;
     position: relative;
     padding: 5px 10px;
   }

   .filter ul li a:hover,
   .filter ul li a.active {
     color: white;
     font-size: 1.2rem;
     text-shadow: 0 0 10px rgba(74, 158, 255, 0.8),
                  0 0 20px rgba(74, 158, 255, 0.6),
                  0 0 30px rgba(74, 158, 255, 0.4);
     transform: translateY(-2px);
   }

   .artwork-image {
     width: 100%;
     height: 100%;
     position: absolute;
     object-fit: cover;
     opacity: 0;
     transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .artwork-image.fade-in {
     opacity: 1;
   }

   @keyframes fadeIn {
     from {
       opacity: 0;
       transform: scale(0.98);
     }
     to {
       opacity: 1;
       transform: scale(1);
     }
   }

   .fade-in {
     animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
   }

   .grids{
     width:88%;
     display: flex;
     justify-content:flex-start;
     flex-wrap: wrap;
     padding: 0;
     gap:20px;

   }
   @media(max-width:2560px) {

}
@media(max-width:1920px) {
  .grids{
    justify-content: center;
  }
}
@media(max-width:1280px) {

}
@media(max-width:1920px) {

}
@media(max-width:1280px) {

}
@media(max-width:1024px) {
  .hashtag-container{
    width:100%;
  }
  .grids{
    width: 100%;
    justify-content: center;
  }
}
@media(max-width:920px) {
  .hashtag-container{
    width:100%;
  }
}
@media only screen and (max-width:768px) {
  .hashtag-container{
    width:100%;
  }
  .gdlr-core-filterer-wrap {
    margin-bottom: 20px !important;
  }

  .card {
    width: 300px;
    height: 300px;
    margin: 10px;
  }

  .mb-80 {
    margin-bottom: 20px !important;
  }

  .grids {
    justify-content: center;
  }
}
@media only screen and (max-width:720px) {
  .language-switch {
    top: 3%;
    right: 18%;
  }

  .gdlr-core-filterer-wrap {
    margin-bottom: 20px !important;
  }

  .row {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .hashtag {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hashtag-container {
    width: 100%;
  }

  .grids {
    padding: 0;
    justify-content: center;
  }
}

@media(max-width:414px) {
}

@media(max-width: 375px) {

}

   </style>
