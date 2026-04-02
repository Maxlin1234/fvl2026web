<!-- eslint-disable max-len -->
<template>
  <footer class="foot-bar" style="background-color:black;bottom: 0;position:relative;z-index: 1;">
    <div class="container">
      <div class="content">
        <div class="columns">
          <!-- <div class="column is-2  has-text-centered">
            <b>聯絡我們</b>
             <p><router-link :to="{ name: 'Home' }">Dome1.0</router-link></p>
             <p><router-link :to="{ name: 'Home' }">Dome2.0</router-link></p>
          </div> -->

          <!-- <div class="column has-text-centered">
            <p style="text-align: left;">
              <b>聯絡我們:</b>
              <br>
              <span style="text-align: left;font-size: 12px;">10655臺北市大安區建國南路一段177號</span><br>
              <span style="text-align: left;font-size: 12px;">info@clab.org.tw</span><br>
              <span style="text-align: left;font-size: 12px;">Tel : +886 2 87735087</span><br>
              <span style="text-align: left;font-size: 12px;">Fax : +886 2 87735035</span>
              &nbsp;&nbsp;&nbsp;
            </p>
          </div> -->
          <!-- <div class="column is-2  has-text-centered">
            <h4>關於未來實驗室
            </h4>
             <p><router-link :to="{ name: 'Home' }">關於未來實驗室</router-link></p>
             <p><router-link :to="{ name: 'Home' }">徵件系統</router-link></p> -->
             <!-- <p><router-link :to="{ path: '/' }">Item 1</router-link></p> -->
             <!-- <p><router-link :to="{ path: '/#/' }">Item 2</router-link></p> -->
          <!-- </div> -->
          <!-- <div class="column has-text-centered">
            <p>
              <b>指導單位:</b>
              <br>
              <a href="https://www.moc.gov.tw/" class="o-footer__guide-item pic"><img src="https://clab.org.tw/wp-content/uploads/2020/05/moc.svg" alt="文化部" style="margin-top: 10px;"></a>
              &nbsp;&nbsp;&nbsp;

            </p>
          </div> -->
           <div class="column  has-text-centered">
            <!-- <b>社群平台:</b> -->
            <br>
            <!-- <div class="icons">
              <b-icon pack="fa" icon="envelope"></b-icon><br>
              <b-icon pack="fa" icon="facebook-square"></b-icon> <br>
              <b-icon pack="fa" icon="instagram"></b-icon>
             </div> -->
          </div> 
        </div>
        <div class="columns has-text-centered">
          <div class="column">
            <p style="margin-bottom:2rem;">
              © 2026 財團法人臺灣生活美學基金會. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'foot-bar',
};
</script>

<style lang="scss" scoped>
.foot-bar {
  padding-top: 30px;
  overflow-x: hidden;
}
.container{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 10px;
}
.content{
  padding: 5px;
}
.columns{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
  margin: 0 !important; /* override bulma negative margins */
}
.column{
  flex: 1 1 260px;
  // max-width: 360px;
  padding: 0 !important; /* override bulma column padding */
}
.column p{
  margin: 0;
  line-height: 1.55;
}
.has-text-centered{
  text-align: center;
}
.has-text-centered p{
  margin-left: auto;
  margin-right: auto;
}
.o-footer__guide-item.pic img{
  max-width: 220px;
  width: 100%;
  height: auto;
}
.icons{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  // gap: 10px;
}

@media (max-width: 900px) {
  .columns{
    gap: 20px;
  }
  .column{
    max-width: 520px;
  }
  .column p{
    text-align: left;
  }
}

</style>
