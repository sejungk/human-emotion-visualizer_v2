import React, {useEffect, useRef} from 'react'
import * as faceapi from 'face-api.js'
import * as p5 from 'p5'
import {loadModels} from './models.js'

const emotionImages = {
  neutral: [
    'https://media.tenor.com/Girts-rG3W8AAAAM/neutral-dominic-monaghan.gif',
    'https://media.tenor.com/APeVPn5Z_BMAAAAd/neutral.gif',
    'https://media.tenor.com/URCdOFBLdgAAAAAM/neutral-get-myself-back-to-neutral.gif',
    'https://media.tenor.com/BfPf6XwD46IAAAAM/futurama-neutral.gif',
    'https://media.tenor.com/g5wBNkGfIGUAAAAC/neutral-neutral-face.gif',
    'https://media.tenor.com/BfPf6XwD46IAAAAM/futurama-neutral.gif',
    'https://media.tenor.com/g5wBNkGfIGUAAAAC/neutral-neutral-face.gif',
    'https://thumbs.gfycat.com/AngryFixedCorydorascatfish-size_restricted.gif',
    'https://thumbs.gfycat.com/DeliciousFlawedGermanshorthairedpointer-size_restricted.gif',
    'https://cdn-icons-png.flaticon.com/512/4803/4803430.png',
    'https://www.researchgate.net/profile/Marc-Fabri/publication/2911618/figure/fig9/AS:668373989986324@1536364185860/The-six-universal-emotions-and-neutral-expression.ppm',
    'https://globalsymbols.com/uploads/production/image/imagefile/35640/81_35641_29639360-1344-46c7-9490-3563699fcdcf.png',
    'https://www.paulekman.com/wp-content/uploads/2013/05/Neutral1.jpg',
    'https://cdn2.vectorstock.com/i/1000x1000/70/81/neutral-emotion-icon-editable-vector-43867081.jpg',
    'https://static.vecteezy.com/system/resources/previews/013/122/954/original/plant-leaf-neutral-emotion-emoticon-icon-vector.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1xLPHgGqc-ynEstWxtvlZ9Ipihi7HwDmEYw&usqp=CAU',
    'https://posercontent.com/sites/default/files/products/17/0120/0200/raw-3d-head-scan-of-neutral.jpg',
    'https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41598-022-25824-9/MediaObjects/41598_2022_25824_Fig1_HTML.png',
    'https://static.vecteezy.com/system/resources/previews/006/159/464/original/satisfaction-level-color-icon-good-neutral-and-bad-experience-emotion-meter-positive-and-negative-scale-with-emoticons-score-with-arrow-pointer-quality-gauge-isolated-illustration-vector.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4BXQfoO3yJO2L9nkiVe9vpbXIufxYE8foLm9SNyqxKA1fI1TNT1rbruprfEwzmYyn-A&usqp=CAU',
    'https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-981-13-2517-5_31/MediaObjects/473236_1_En_31_Fig1_HTML.png',
    'https://ars.els-cdn.com/content/image/1-s2.0-S1350449516304182-gr6.jpg',
    'https://infraredthermalimagingservices.com/wp-content/uploads/2020/04/Fever-IR-Picture-300x229.png',
    'https://posercontent.com/sites/default/files/products/17/0119/1004/raw-3d-head-scan-of-neutral.jpg',
    'https://image.spreadshirtmedia.com/image-server/v1/compositions/T127A1PA4192PT21X7Y7D1026069238W1697H2036/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/face-emotion-neutral-faces-feelings-expression-small-buttons.jpg',
    'https://www.researchgate.net/profile/Lena-Lim-5/publication/323127908/figure/fig1/AS:598483262246912@1519700937905/a-Examples-of-actors-expressing-the-five-emotions-neutral-anger-happiness-sadness.png',
    'https://i5.walmartimages.com/asr/458b0db9-937a-4da0-8511-9b5f1c52d7f2.f4119fdda246930dbf81db902275beb5.jpeg',
    'https://www.researchgate.net/profile/Umair-Akram-4/publication/343587084/figure/fig1/AS:923398322548737@1597166724279/A-Example-of-female-neutral-face-B-Example-of-male-neutral-face.jpg',
    'https://www.researchgate.net/publication/335974391/figure/fig1/AS:868743710269440@1584136049742/Samples-of-computer-generated-upper-row-and-real-faces-lower-row-from-one-actor-From.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/db773c104641293.5f7225c30fe48.jpg',
    'https://c8.alamy.com/comp/K08BXN/portrait-of-henry-newell-martin-looking-to-the-left-of-camera-neutral-K08BXN.jpg',
    'https://neurosciencenews.com/files/2017/04/facial-expression-emotion-neurosciencenews.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSShpwvzxSpWyxJ14Dx2FaSGmvZMo3_q6sLIw&usqp=CAU',
    'https://www.realmofhistory.com/wp-content/uploads/2017/01/10-facial-reconstructions-history-min.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSShpwvzxSpWyxJ14Dx2FaSGmvZMo3_q6sLIw&usqp=CAU',
    'https://tisch.nyu.edu/content/dam/tisch/photo/News/2021-06/aem-federal-hall-women-in-the-face-of-history.JPG.precrop.46,43,1175,776.xjpeg',
    'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg3MTgyMzM0ODMzODYyNTQy/lincoln-gettyimages-90735089.jpg',
    'https://images.thenorthface.com/is/image/TheNorthFaceBrand/210930-about-us-history-1969-img-right-desktop?wid=1550&qlt=85',
    'https://assets1.cbsnewsstatic.com/hub/i/r/2011/01/31/2a016a17-4691-47b9-b854-1e838933a97b/thumbnail/640x481/b93510c95ce4d74f0c5a84683aa10e08/bookertwashington.jpg',
    'https://collectionapi.metmuseum.org/api/collection/v1/iiif/470557/945436/main-image',
    'https://media.newyorker.com/photos/5909666a1c7a8e33fb38d5dc/master/w_2560%2Cc_limit/121029_r22743_g2048.jpg',
    'https://static01.nyt.com/images/2019/07/14/opinion/physiognomy1/physiognomy1-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    'https://live-production.wcms.abc-cdn.net.au/d9e569c6b200491d2d27fdf78210fb9e?impolicy=wcms_crop_resize&cropH=727&cropW=1092&xPos=0&yPos=255&width=862&height=575',
    'https://shootitwithfilm.com/wp-content/uploads/2022/11/Intro-to-Neutral-Density-Filters-by-James-Baturin-on-Shoot-It-With-Film-05.jpg'
  ],
  happy: [
    'https://media.tenor.com/I3btKSBxue4AAAAC/yell-shout.gif',
    'https://i.gifer.com/origin/65/651d5042e49e2eea63ea94c09e119716_w200.gif',
    'https://media.tenor.com/hI-oOVvwasYAAAAC/happy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjY5ZTczMzgyMmMzZDYzNWMzNjdlOTc1NzM1NzViNGQ1ODQ4ZjYyZiZjdD1n/XR9Dp54ZC4dji/giphy.gif',
    'https://i.gifer.com/origin/f0/f0bdf628922be5398acdffd143c734c1_w200.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDMwZjQwMDY5ZWRjODQwZGQxNWJjMjE4ZjgxOGZhMTdhNTNhZmM2NSZjdD1n/hB9xk6IevvPwY/giphy.gif',
    'https://thumbs.gfycat.com/MiserableHandyAmericantoad-max-1mb.gif',
    'https://thumbs.gfycat.com/CriminalGroundedDrafthorse-max-1mb.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTM5MzgxMTZjMDcwYWQ1MGNjMTE0OWI5NzAyMzQ1ZjZkN2I5NzI4MCZjdD1n/z8XtwKGIRQSBCmU4sW/giphy.gif',
    'https://hbr.org/resources/images/article_assets/2020/09/A_Sep20_14_1189155141.jpg',
    'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/2233721/171120-smile-stock-njs-333p.jpg',
    'data:image/jpeg;base64,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',
    'https://hips.hearstapps.com/hmg-prod/images/happy-smiley-face-balloons-against-colorful-cotton-royalty-free-image-1677446093.jpg?crop=1.00xw:0.752xh;0,0.248xh&resize=1200:*',
    'https://i.guim.co.uk/img/media/7a2f365685c03860db34e122bc5165a01874dfde/0_112_5093_3055/master/5093.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=66a0eedff1916b274c39b8b781441a10',
    'https://mediacloud.theweek.com/image/private/s--yHGeAyrs--/v1608528305/istock-527028804.jpg',
    'https://play-lh.googleusercontent.com/osIpRz-LF6Q6_-hRHkZtvmIsmHYdlmx921i0RM4aFRPq78QbqdrEagqs9XxefRIZxg',
    'https://resources.stuff.co.nz/content/dam/images/4/y/x/1/g/g/image.related.StuffLandscapeSixteenByNine.1240x700.4yx1ga.png/1644341988702.jpg',
    'https://news.umanitoba.ca/wp-content/uploads/2015/03/happyball.jpg',
    'https://img.freepik.com/free-photo/assortment-with-happy-emotion_23-2148860256.jpg?w=360',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJnJCckBUTPfCnzypDqUGMeHere4woVTeLWLSmluGXgonXdN4b4wvTJra4gHRCiIhVnK8&usqp=CAU',
    'https://images.theconversation.com/files/200232/original/file-20171220-4957-hspudb.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    'https://lirp.cdn-website.com/9f256b4f/dms3rep/multi/opt/Mindfulness-happy-640w.jpg',
    'https://images.fastcompany.net/image/upload/w_1280,f_jpg,q_auto,fl_lossy/wp-cms/uploads/2021/12/p-1-90703664-dont-try-to-be-happy-focus-on-these-5-things-instead.gif',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2021-04/smiley-2979107_1.jpg?itok=iW5EhuqS',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwr4Sy7FbJ2UKFkyd8GO_OmLYPzKRMmhE2aw&usqp=CAU',
    'https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458.jpg',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2022-02/pexels_pixabay.jpg?itok=WDtPHrht',
    'https://static01.nyt.com/images/2022/05/15/books/review/CHANG-HAPPY/CHANG-HAPPY-superJumbo.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_q6v-XsMjQAYj_ZLWae-hfDEQuKhwuiPQQ&usqp=CAU',
    'https://images.squarespace-cdn.com/content/v1/59e51f9bf14aa199001d4943/1580779886451-6UKEOBLDXYFK38T5DVR1/smilelogo-yellow.png',
    'https://pyxis.nymag.com/v1/imgs/f4c/843/ab4fcaa837f116411dfe4a1780dc251d00-26-happiness-feature-lede.2x.rvertical.w512.jpg',
    'https://www.irishexaminer.com/cms_media/module_img/6431/3215879_12_seoimage4x3_iStock-1207314090_1_.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSraVZoKItERK46kVxD35AfDYyRpB-tI_WDJQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFaeHniOiyBjkG3wFV993MLo5toGlRaNcdpA&usqp=CAU',
    'https://www.boredpanda.com/blog/wp-content/uploads/2017/01/heartwarming-historic-photos-9-5873405826a8b__700.jpg',
    'https://static.demilked.com/wp-content/uploads/2017/01/happy-historic-photos-vintage-9.jpg',
    'https://www.boredpanda.com/blog/wp-content/uploads/2017/01/heartwarming-historic-photos-48-58737b72ef0eb__700.jpg',
    'https://hbr.org/resources/images/article_assets/hbr/1201/R1201H_MINJUN.jpg',
    'https://www.boredpanda.com/blog/wp-content/uploads/2017/01/heartwarming-historic-photos-587346b898dc4__700.jpg',
    'https://www.gannett-cdn.com/presto/2022/01/28/PWIL/73ae0f94-60aa-46ab-ba8d-7f04e2b4b12a-011822-Hot_Cocoa-jh08.JPG?width=1280&height=720&fit=crop&format=pjpg&auto=webp',
    'https://www.bradaronson.com/wp-content/uploads/2013/10/happy.jpg',
    'https://hbr.org/resources/images/article_assets/2020/09/A_Sep20_14_1189155141.jpg',
    'https://dg.imgix.net/do-you-think-you-re-happy-jgdbfiey-en/landscape/do-you-think-you-re-happy-jgdbfiey-9bb0198eeccd0a3c3c13aed064e2e2b3.jpg?ts=1520525855&ixlib=rails-4.2.0&fit=crop&w=2000&h=1050'
  ],
  sad: [
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGU4OWU0M2M4MWFmYjc3YTE4MWNjNzY4ZmI5NDA3Y2YwODMxNGZjYiZjdD1n/BEob5qwFkSJ7G/giphy.gif',
    'https://media.tenor.com/f1fVZ5yuLaIAAAAd/sad.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDk4MTE3ZjM5ODk3ZjMxMmMyYTE4YTlmYTA1OTQ2ZjI2YWRiODI0YyZjdD1n/1BXa2alBjrCXC/giphy.gif',
    'https://media.tenor.com/NZh6iP8wgKMAAAAd/crying-stitch.gif',
    'https://media.tenor.com/KhBoBD7g1l0AAAAd/le-sad.gif',
    'https://media.tenor.com/KtmsDsp_99AAAAAC/anime-sad.gif',
    'https://media.tenor.com/RpYv2FRvRJoAAAAM/sad-cry.gif',
    'https://media.tenor.com/KtmsDsp_99AAAAAC/anime-sad.gif',
    'https://media.tenor.com/SjD5d9_S6SgAAAAC/sad-the-office.gif',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/warsaw-1943-web-1518647176.jpg',
    'https://i.pinimg.com/222x/c1/fa/d6/c1fad6c824b9b683cb3bf6e4f2180857.jpg',
    'https://allthatsinteresting.com/wordpress/wp-content/uploads/2021/09/hasanlu-lovers.jpeg',
    'https://m.media-amazon.com/images/I/81CuK04gyeL._AC_UF894,1000_QL80_.jpg',
    'https://www.elpuntavui.cat/imatges/50/78/alta/780_0008_5078999_73c8fdc3ec7fb916fcd8e7f084bbb25a.jpg',
    'https://i0.wp.com/culturedarm.com/wp-content/uploads/Pierrot-1.jpg?fit=1200%2C803&ssl=1',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Petrovaradin_ship_1821.jpg/800px-Petrovaradin_ship_1821.jpg',
    'https://www.listchallenges.com/f/items/0b2e2f24-4d46-4f00-b1aa-9ef1759a1ebc.jpg',
    'https://media.npr.org/assets/img/2016/01/05/04041u-edit_custom-a2ce454cf9032c5222b42712aeb8bddf95eb55b1-s1100-c50.jpg',
    'https://thumbs.dreamstime.com/b/old-stone-sculpture-sad-woman-grief-virgin-mary-statue-faith-suffering-death-concept-151359064.jpg',
    'https://pbs.twimg.com/media/DJEc-qTVYAAgsCW?format=jpg&name=4096x4096',
    'https://th-thumbnailer.cdn-si-edu.com/rljdX84ICfjG72LvvXhv1q_7gw8=/fit-in/1072x0/https://tf-cmsv2-photocontest-smithsonianmag-prod-approved.s3.amazonaws.com/eb75ded7-0671-4171-982d-933d1bd05650.jpg',
    'https://i.pinimg.com/236x/36/d4/a9/36d4a96549399dca8275c32134d3f4c4.jpg',
    'https://www.tokyotimes.org/archives/sad_old_man102copy.jpg',
    '/images/sad-14.jpg',
    'https://bloximages.chicago2.vip.townnews.com/billingsgazette.com/content/tncms/assets/v3/editorial/0/b3/0b3a4659-46bb-5388-873b-ea225c5649eb/5dd8975c3f21d.image.jpg?resize=1200%2C820',
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/sad-sorrowful-lonely-old-man-wall-decor.jpg',
    'https://cdn.mos.cms.futurecdn.net/RgNsLF79QWNTwGWD7SVNDi-1200-80.jpg',
    'https://cdn.catholic.com/wp-content/uploads/Battle_of_Cresson-900x900.jpg',
    'https://www.apa.org/images/sad-title-image_tcm7-179953.jpg',
    'https://www.goodtherapy.org/blog/blog/wp-content/uploads/2014/12/man-with-head-down.jpg',
    'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_42/1495563/sadness-inside-out-today-main-tease-191018.jpg',
    'https://www.hopkinsmedicine.org/-/media/images/health/1_-conditions/seasonal-affective-disorder/sad-thumb.ashx',
    'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
    'https://cdn.theatlantic.com/thumbor/vzhJ_xMbL1ihk4wwQPhEGIIgiQo=/0x0:2000x1125/960x540/media/img/mt/2022/04/Atl_am_sad_v1/original.png',
    'https://cdn.wallpapersafari.com/50/18/GgbYdz.jpg',
    'https://lovevery.com/community/blog/wp-content/uploads/2020/05/Weekly_Week-82-Hero-e1592838526503.jpg',
    'https://w0.peakpx.com/wallpaper/328/274/HD-wallpaper-bad-vibe-sad-sadness.jpg',
    'https://wallpapers.com/images/hd/gray-aesthetic-sad-dkh6x1gpw2dye0ou.jpg',
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_601403390_370517.jpg',
    'https://images.everydayhealth.com/images/how-to-cope-with-sadness-subguide-1440x810.jpg',
    'https://t3.ftcdn.net/jpg/01/18/39/62/360_F_118396217_l02xTLRakFADBX5TY0CXjvDSh5BaW6y8.jpg',
    'https://yt3.googleusercontent.com/QTYDDC_qfu3FYcFLVVyAJtjcmH9Fx6Eb6Kusq9OJ44mYFnGUx5M3PE4pmhuHlhoVd-CuG3YK3vw=s900-c-k-c0x00ffffff-no-rj',
    'https://i.pinimg.com/736x/0f/cc/af/0fccafe75b90b9541d0c247f2c916970.jpg'
  ],
  angry: [
    'https://media.tenor.com/eQe_FWbYs2oAAAAC/angry-mad.gif',
    'https://media.tenor.com/eQe_FWbYs2oAAAAC/angry-mad.gif',
    'https://media.tenor.com/i9-0ZoVgmvcAAAAM/angry-little.gif',
    'https://media.tenor.com/VMpOxDqPGjIAAAAd/annoyed-angry.gif',
    'https://media.tenor.com/bgkPZCa6qKcAAAAM/angry.gif',
    'https://media.tenor.com/GX36qlwcJWsAAAAM/peach-goma.gif',
    'https://media4.giphy.com/media/3o7bu8mwh3U6SXtLjy/200w.gif',
    'https://media3.giphy.com/media/l2Je7ywyRsDSPk51u/giphy.gif',
    'https://culturacolectiva.com/resizer/JuUgCt0oz1dJqD_BI68g5dwuCcw=/arc-photo-culturacolectiva/arc2-prod/public/ILG6APJRXFEYDJEKNKLZI54LRY.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/Jacques-Louis_David_-_The_Anger_of_Achilles_-_Google_Art_Project.jpg',
    'https://www.bostonreview.net/wp-content/uploads/2022/10/Annibale_Carracci_The_Cyclops_Polyphemus.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Body_of_Abel_Found_by_Adam_and_Eve_by_William_Blake_c1826_Tate.jpg/1024px-The_Body_of_Abel_Found_by_Adam_and_Eve_by_William_Blake_c1826_Tate.jpg',
    'https://npr.brightspotcdn.com/dims4/default/6ccea5f/2147483647/strip/true/crop/709x1083+0+0/resize/880x1344!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwyprmain%2Ffiles%2F202102%2Frosenwein_jacket.jpg',
    'https://theestablishment.co/wp-content/uploads/2018/08/lead.jpg',
    'https://i0.wp.com/newspack-washingtoncitypaper.s3.amazonaws.com/uploads/2023/01/STCJane_1Aemelia-Workman-and-Michael-Urie-in-Jane-Anger-DJ-Corey-Photography--scaled.jpg?fit=2560%2C1703&ssl=1',
    'https://www.autostraddle.com/wp-content/uploads/2012/06/UiA.jpg?resize=1200,675',
    'https://personalexcellence.co/files/doll-silhouette.jpg',
    'https://cdn1.mtggoldfish.com/images/h/Uncontrollable-Anger-CHK-672.jpg',
    'https://www.judsonpress.com/Content/Site189/ProductImages/255E.jpg',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2022-03/aeneas_and_turnus-by-luca-giordano.jpg?itok=QfIoDWOR',
    'https://images.squarespace-cdn.com/content/v1/5e138450a5595c26c881e52d/1612992282251-1LZKDX4CV88RNTOKGPJB/anger-christ-saint-catherines-monastery-crop.jpg?format=1000w',
    'https://theologia.blog/wp-content/uploads/2019/04/angry-God.png',
    'https://maniphesto.com/wp-content/uploads/2021/05/Icon-for-blog-post-2-1024x794.jpg',
    'https://i.international.la-croix.com/0x0/prod/uploads/news/2019/03/1553850724.jpg',
    'https://ychef.files.bbci.co.uk/976x549/p07tv1lv.jpg',
    'https://www.bostonreview.net/wp-content/uploads/2022/10/the_rage_of_achilles_by_giovanni_battista_tiepolo.0-2.jpg',
    'https://brill.com/view/journals/ehcs/4/1/2208522X_004_01_s002_i0003.jpg',
    'https://cdn.powerofpositivity.com/wp-content/uploads/2015/03/anger-at-computer-punching.jpg',
    'https://images.ctfassets.net/zkw0qlnf0vqv/psycom_page_fid37327_asset_4808/80b80454a89a9fd0a3f6c570836342d2/angry_business_woman',
    'https://static.wikia.nocookie.net/disney/images/5/5a/Profile_-_Anger.png/revision/latest?cb=20190314125119',
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_1196039376_410534.jpg',
    'https://images.theconversation.com/files/454130/original/file-20220324-21-15affoj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    'https://media.self.com/photos/6363facb203fe1ba1ff8e065/4:3/w_2560%2Cc_limit/AM-Self-Anger-Final3.png',
    'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQVp24BtCuD3cjLV5X3Qf_cjxxJvjoq6vVt8EEd-39hWAnNZAcb5DyCHSafwus0Gkf8_dVyw3rBseaFUJeco60HVgMxrvxWK7L9jfKKlBT5CwfWurRizfOvPMfH-YlPM-KxeR2DsULsMJ-TIdr4Zp6GtIidw.jpg?r=3d8',
    'https://static01.nyt.com/images/2022/07/12/well/22WELL-KIDS-ANGER2/22WELL-KIDS-ANGER2-videoSixteenByNine3000.jpg',
    'https://media.self.com/photos/637d90015c6a7190177bb67d/3:2/w_1431,h_954,c_limit/MarinaEsmeraldo_SELF_Round3_How%20to%20Stop%20Being%20Angry%20at%20Yourself.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQzuHo58RgTU0SK__8-MovPDnm_GXPRheMbg&usqp=CAU',
    'https://thumbs.dreamstime.com/b/emotions-television-fan-screaming-hate-rage-crying-emotional-angry-man-screaming-colorful-bright-lights-studio-114631138.jpg',
    'https://www.brainline.org/sites/default/files/qa/image/iStock-938919394_anger_crop.jpg',
    'https://images.hindustantimes.com/img/2021/12/18/550x309/anger_thumb_1639828506775_1639828518143.jpg',
    'https://images.everydayhealth.com/images/emotional-health/7-ways-anger-is-ruining-your-health-722x406.jpg',
    'https://images.healthshots.com/healthshots/en/uploads/2023/02/24123050/angry-woman.jpg',
    'https://static.vecteezy.com/system/resources/previews/001/839/464/original/emoji-face-angry-funny-character-free-vector.jpg',
    'https://pyxis.nymag.com/v1/imgs/249/37b/116999ecb25ac04c42cdac0a91c578439f-29-angry-face.2x.rsquare.w190.jpg',
    'https://static.wikia.nocookie.net/pixar/images/7/7a/Io_Anger_standard2.jpg/revision/latest?cb=20150425021210',
    'https://i0.wp.com/focusforwardcc.com/wp-content/uploads/Angry-Man_rs.jpg',
    'https://www.psypost.org/wp-content/uploads/2018/08/angry-man-702x375.jpg',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2020-11/screaming-african-american-woman-in-red-top-with-closed-eyes-depressed-angry-black-girl-over-white_t20_opzrkm2.jpg?itok=NeKP4Cup',
    'https://img.apmcdn.org/d947173a53458e5298472d9450325e7adc13468f/widescreen/60636c-20190625-angry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Gnome-face-angry.svg/1200px-Gnome-face-angry.svg.png',
    'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_37/2156151/170915-anger-screaming-stock-njs-12p.jpg',
    'https://www.google.com/search?q=anger+historic&tbm=isch&ved=2ahUKEwjY8qWXodD9AhV3FmIAHfZ9BfwQ2-cCegQIABAA&oq=anger+historic&gs_lcp=CgNpbWcQAzoECCMQJzoICAAQgAQQsQM6BwgAELEDEEM6BAgAEEM6BQgAEIAEOgYIABAFEB46BggAEAgQHjoECAAQHjoHCAAQgAQQGDoHCAAQgAQQE1DCPVisUmCMVGgBcAB4AIABd4gBggaSAQM5LjGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=X44KZJjHAfesiLMP9vuV4A8&bih=715&biw=992#imgrc=OJphivUfNpGbnM'
  ],
  fearful: [
    'https://media4.giphy.com/media/14ut8PhnIwzros/giphy.gif',
    'https://media.tenor.com/dqBF3-lDtBAAAAAC/fear.gif',
    'https://thumbs.gfycat.com/SmartSoggyAlbertosaurus-size_restricted.gif',
    'https://media.tenor.com/cV_jJT6v9toAAAAM/christmas-cheer.gif',
    'https://www.gifcen.com/wp-content/uploads/2022/12/scared-gif-3.gif',
    'https://thumbs.gfycat.com/BossyDependableDuck-max-1mb.gif',
    'https://media.tenor.com/Q7ngFhPvZIkAAAAC/fear.gif',
    'https://media.tenor.com/-HgUfe8e9s8AAAAM/scared-afraid.gif',
    'https://atchuup.com/wp-content/uploads/2015/03/scary-historical-photos-6.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDc9TDESKFY99kUDjS3_D3YG99eVNlpMuqQ&usqp=CAU',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-10/16/13/asset/buzzfeed-prod-fastlane-01/sub-buzz-15720-1508175048-8.jpg?downsize=1600%3A%2A&output-quality=auto&output-format=auto',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUw0xJuB_96lsprdBkF162iKjTfdNNY5-Nxw&usqp=CAU',
    'https://allthatsinteresting.com/wordpress/wp-content/uploads/2021/09/real-scary-pictures-edward-paisnel.jpeg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F09%2Fit-11951r-2000.jpg&q=60',
    'https://allthatsinteresting.com/wordpress/wp-content/uploads/2021/09/raymond-robinson.jpeg',
    'https://imgix.ranker.com/user_node_img/50093/1001848366/original/a-doll-with-two-faces-1920-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375',
    'https://i.pinimg.com/originals/8b/9e/1f/8b9e1f562f16ceb7a5d61ac9fbd49cb0.jpg',
    'https://cdn.ebaumsworld.com/2018/06/02/081248/85673872/creepy-vintage-photos-old-woman-doll.jpg',
    'https://historydaily.org/content/53384/9b16a3922ea9789235de061d8e16ad8e.jpg',
    'https://allthatsinteresting.com/wordpress/wp-content/uploads/2020/12/dead-victorian-child.jpg',
    'https://i.insider.com/5b3529dacb2acb22008b45bf?width=750&format=jpeg&auto=webp',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-10/16/13/asset/buzzfeed-prod-fastlane-02/sub-buzz-27111-1508174545-9.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-10/16/13/asset/buzzfeed-prod-fastlane-01/sub-buzz-15226-1508174254-1.jpg',
    'https://www.obsev.com/wp-content/uploads/sites/2/2022/04/Title-Image-1.jpg.optimal.jpg',
    'https://allthatsinteresting.com/wordpress/wp-content/uploads/2020/12/h-g-robley-with-mokomokai-heads.jpg',
    'https://historydaily.org/content/53384/30ff99c68f4cb1451712019995655ef9.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/musical-instrument-supposedly-rising-into-the-air-at-a-news-photo-1600783686.jpg?crop=1.00xw:0.745xh;0,0.182xh&resize=640:*',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ten-year-old-girl-stands-in-the-corner-of-her-home-with-her-news-photo-1600784321.jpg',
    'https://images.squarespace-cdn.com/content/v1/54132b01e4b0f5bf7ad3ed92/1551819479402-46RXORZV76GYQJ7R87NY/9781934843857.jpg?format=500w',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcPrhf2uN3sBfQZgv8ji-4lk-JPu9O4VxjA&usqp=CAU',
    'https://bpldcassets.blob.core.windows.net/derivatives/images/commonwealth:qf85nq07p/image_access_800.jpg',
    'https://www.wearethemighty.com/uploads/2021/12/The_Nusseree_Battalion.jpg',
    'https://isteam.wsimg.com/ip/a507c203-a338-11e5-aa9a-00219ba60aa6/ols/1055_original/:/rs=w:600,h:600',
    'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/163/958/BRANDHD2398_THC_AMRC_191260_CRS_000_2398_30_20160920_02_HD.jpg?w=548',
    'https://c8.alamy.com/comp/2AFJ3WH/zigzag-journeys-in-europe-vacation-rambles-in-historic-lands-i-aused-by-poisoni-which-had-been-applied-to-the-leaves-sufferings-were-dreadful-in-tlie-extr-m-historians-tell-us-that-he-sweat-drops-of-blood-mismental-anguish-was-as-fearful-as-his-bodily-distress-he-wouldout-to-his-nurs-nourrke-ma-mie-ma-bonne!-que-du-sang-out-tnauvais-conseils-jai-suivis-oh-seigneui-v-ct-faites-moi-misericora-ah-nurse-my-good-nurse!-what-blood!-what-murders!-uh-what-bad-counsels-1-fol-d!-lord-god-pardon-me!-have-mercy-on-me!-historians-cover-the-memory-of-charles-ix-with-infamy-but-hisfirst-2AFJ3WH.jpg',
    'https://c8.alamy.com/comp/2AJGM21/the-history-of-england-from-the-accession-of-james-the-second-esperate-that-the-muzzles-of-the-muskets-crossed-the-swisswere-driven-back-with-fearful-slaughter-more-than-eighteen-hundredof-them-appear-from-the-french-returns-to-have-been-killed-or-woundedluxemburg-afterwards-said-that-he-had-never-in-his-life-seen-so-furiousa-struggle-he-collected-in-haste-the-opinion-of-the-generals-who-sur-rounded-him-all-thought-that-the-emergency-was-one-which-could-bemet-by-no-common-means-the-kings-household-must-charge-theenglish-the-marshal-gave-the-word-and-the-household-headed-bythe-prin-2AJGM21.jpg',
    'https://thumbs.dreamstime.com/b/ancient-big-statute-scary-fearful-heavy-armed-gatekeeper-medieval-warrior-weapon-historical-downtown-dresden-240475309.jpg',
    'https://ids.si.edu/ids/deliveryService?id=NMAH-2003-20004&max=1000',
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/the-fearful-explosion-p4-historic-illustrations.jpg',
    'https://media.wnyc.org/i/800/0/l/85/1/Jacobins.jpg',
    'https://api.time.com/wp-content/uploads/2016/01/fdr.jpeg',
    'data:image/jpeg;base64,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',
    'https://media.snopes.com/2022/10/GettyImages-1185552380.jpg',
    'https://www-tc.pbs.org/wgbh/americanexperience/media/canonical_images/feature/American_fear_640.jpg',
    'https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2019/08/08172103/Scary_Stories_to_Tell_in_the_Dark_CC_Rep.jpg',
    'https://www.kennedy-center.org/globalassets/education/resources-for-educators/classroom-resources/artsedge/media/the-skeleton-of-a-scary-story/scary-stories-5-169.jpg',
    'https://cdn-images-1.medium.com/max/787/0*GmreRIJc8tU3wFaS.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F04%2Fpale-lady-gammell-illustration-2000.jpg',
    'https://nhm.org/sites/default/files/styles/fwc_full_small/public/2019-09/nhh-web-asset_190920_0.jpg?h=35488d42',
    'https://www.parents.com/thmb/DUyi6Vrwsr6CgaOkbiBq45aW0Xc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-553008905-2000-68d9e62858ba44f98961d3ec39abc757.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS888Ft5sWuzvDh1SY-D0TUG6jS9vZWY85HR0EmBdQeKSsXSGda0mToi20QLNRaKGeZIfM&usqp=CAU',
    'https://www.sleepoutfitters.com/media/wysiwyg/ganapathy-kumar-306285-unsplash_1_.jpg',
    'https://ychef.files.bbci.co.uk/1280x720/p04chzvm.jpg',
    'https://static.sadhguru.org/d/46272/1633185976-1633185975253.jpg',
    'https://pyxis.nymag.com/v1/imgs/1ac/3cc/76933a31adb9d90dbc085088f11f032276-12-fear.rsquare.w700.jpg',
    'https://www.lionsroar.com/wp-content/uploads/2020/08/Fear.png'
  ],
  disgusted: [
    'https://66.media.tumblr.com/tumblr_m80gkw3l8q1rn95k2o1_500.gif',
    'https://www.reactiongifs.com/r/disgstd.gif',
    'https://smartbitchestrashybooks.com/WP/wp-content/uploads/2017/06/digusted-gif.gif',
    'https://i.pinimg.com/originals/8e/ac/8d/8eac8dbf8454fa416e35a4051b575c15.gif',
    'https://thumbs.gfycat.com/NeedySameBlueandgoldmackaw-max-1mb.gif',
    'https://media.tenor.com/yFaeX-6QHy8AAAAM/disgusted.gif',
    'https://daily.jstor.org/wp-content/uploads/2021/06/disgust_morality_1050x700.jpg',
    'https://thumbs.dreamstime.com/b/girl-face-anime-style-avatar-emotion-surprise-disgust-vector-177442481.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Expression_of_the_Emotions_Plate_V%2C_2%2B3.jpg/290px-Expression_of_the_Emotions_Plate_V%2C_2%2B3.jpg',
    'https://scepticon.files.wordpress.com/2009/10/microexpressions-disgust.jpg',
    'https://thumbs.dreamstime.com/b/woman-pinches-nose-fingers-looks-disgust-something-stinks-bad-smell-closeup-portrait-headshot-hands-situation-isolated-60901479.jpg',
    'https://static01.nyt.com/images/2022/01/02/magazine/02mag-disgust-05/02mag-disgust-05-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    'https://media.npr.org/assets/img/2014/03/28/faces_wide-927a3f224aa281bb50d4da080246697055eac84e-s1100-c50.jpg',
    'https://thumbs.dreamstime.com/b/disgust-illustration-one-basic-human-emotions-green-creature-disgusted-expression-its-face-frowning-69969362.jpg',
    'https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320553/lotus-seed-heads.jpg',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2017-05/disgust.jpeg.jpg?itok=tM1axBi-',
    'https://cdn.theatlantic.com/thumbor/C2ud716ww73--CIXD89Jq4gyGns=/570x330/media/img/posts/2013/10/eatbuggggz_banner/original.jpg',
    'https://images.wsj.net/im-596240?width=620',
    'https://storage.googleapis.com/plos-corpus-prod/10.1371/journal.pone.0083277/1/pone.0083277.g003.PNG_M?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wombat-sa%40plos-prod.iam.gserviceaccount.com%2F20230310%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230310T022812Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=617d1b674d7bb960dfc8860934a7a598532a97ced9108c4cf33bad4c772e36fc18496787faf2e80eb68ec914f42b2a31d9a7e104d92f28fbcf9481920db8bd73b0596a86c925456df371db99a216e9b0c87443624b2cd3b47091b94a5c77027ee3b7a81dc9f6c466582fa588b4c4d904f203974fe18fed03a09e77aa36159f0486b16b9fca681f50ce17f97e9a29d0efdf97935fd31788ac309421128cee68fe1cfd23f0e24035ac46a6a985e6474b7e1f0923e3eeaf6cca3fe3bffa3dc1809b6540b1bf71eb0df2e7942f94546aab84bf3f704c72d05544ded1fafde4e57ba733263219647c15b06b77d68df7246800a3dd70833bc55c58e85fd098be41f93d',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZYiwBM4r2onBO6ft-HiTJcdpCiGMduKhag&usqp=CAU',
    'https://everycharacter.com/images/everycharacter/public/1024/9aa85f15fe34a67d014b05d330add8e0.jpg',
    '/https://content.presspage.com/uploads/1065/disgusting.jpg?10000',
    'https://i.ytimg.com/vi/xEycwV-JUtc/maxresdefault.jpg',
    'https://i.guim.co.uk/img/media/367e6c4b7d2215c5c69d1714f27e9017f0e25766/0_1465_6192_6045/master/6192.jpg?width=465&quality=85&dpr=1&s=none',
    'https://static.wixstatic.com/media/d5cc5f_81430e3ed1194e54943fca1199db8b33~mv2.jpg/v1/fill/w_640,h_502,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/d5cc5f_81430e3ed1194e54943fca1199db8b33~mv2.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMq5znyLs6FVu2MqeBrwuGLQAt0LZZ0fNsRShqCzL_GWLw2jszqtcLmZkRAHZQgMlFZGc&usqp=CAU',
    'https://www.gameshub.com/wp-content/uploads/sites/5/2022/10/scorn-game-review-key-art.jpg?w=1024',
    'https://f4.bcbits.com/img/a0162105559_65',
    'https://daily.jstor.org/wp-content/uploads/2021/06/disgust_morality_2_1050x700.jpg',
    'https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NjM4ODcxODQwMzAzMDk0/a-history-of-dirty-habits.jpg',
    'https://i.scdn.co/image/ab67616d0000b2734496efdb114dfdd0e7d0edbc',
    'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1ODQzMjg0MDEzMzYwMjIx/henry-viii-hampton-court-gettyimages-919007348.jpg',
    'https://alpha.aeon.co/images/71be818c-8c84-41e5-afb7-a90040238ddd/header_Essay-E123993.jpg',
    'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2017-05/disgust.jpeg.jpg?itok=tM1axBi-',
    'https://www.cam.ac.uk/sites/www.cam.ac.uk/files/styles/content-885x432/public/news/research/news/anexpressionofdisgustwellcomel0045815.jpg?itok=19wzHpRh',
    'https://i.ytimg.com/vi/6CVlPHtaouM/maxresdefault.jpg',
    'https://www.boredpanda.com/blog/wp-content/uploads/2022/11/unappealing-food-pics-cover_800.png',
    'https://listverse.com/wp-content/uploads/2020/03/23773182-0-image-a-46_1580303417295-1200x720.jpg',
    'https://cdn1.i-scmp.com/sites/default/files/styles/og_twitter_scmp_analysis/public/images/methode/2018/05/29/8bdcc67c-6307-11e8-82ea-2acc56ad2bf7_image_hires_174031.JPG?itok=boX3OETP&v=1527586859',
    'data:image/jpeg;base64,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',
    'https://flyctory.com/wp-content/uploads/2022/06/20210702_DisgustingFood_0035.jpg',
    'https://static01.nyt.com/images/2022/01/02/magazine/02mag-disgust-04/02mag-disgust-04-mobileMasterAt3x.jpg',
    'https://recipes.timesofindia.com/us/photo/91186110/91186110.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/slideshow2/bug-small-1508865531.jpg',
    'https://ewscripps.brightspotcdn.com/dims4/default/cd15664/2147483647/strip/true/crop/894x503+3+6/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F51%2Fed%2Fd68255134867988511d94568197e%2Fbull-testicles.jpg',
    'https://th-thumbnailer.cdn-si-edu.com/jfJqrQsGjA1RinAlEcZsDxbzzNY=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/03/7e/037ece5e-1bbd-4da5-ae73-bca4c73c2a1c/cockroach.jpg',
    'https://cdn3.whatculture.com/images/2013/07/hannibal-brains.jpg'
  ],
  surprised: [
    'https://media.tenor.com/9CJaHEmyKPAAAAAC/chris-pratt-andy-dwyer.gif',
    'https://media.tenor.com/rKLBka9zl5UAAAAM/yeah-excellent.gif',
    'https://thumbs.gfycat.com/CompassionateRemarkableArabianoryx-max-1mb.gif',
    'https://media.tenor.com/4uLw1ym9J2MAAAAd/otter-surprised.gif',
    'https://media2.giphy.com/media/ooz0LQ8fIqkRNFXjgL/giphy.gif',
    'https://media.tenor.com/njUIGK8c2OYAAAAC/surprised-hamster.gif',
    'https://media2.giphy.com/media/6nWhy3ulBL7GSCvKw6/giphy.gif',
    'https://www.pngkey.com/png/detail/77-779430_man-face-person-human-surprised-surprise-emotion-surprise.png',
    'https://i.ytimg.com/vi/DjSaXiULs5Q/maxresdefault.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Charles_Bell%2C_Essays_on_the_anatomy_of_Wellcome_L0031951.jpg/220px-Charles_Bell%2C_Essays_on_the_anatomy_of_Wellcome_L0031951.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMYKnQd5s7onT6rXbigqttYfYWULbXONk_Xg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0vn5MDoqZusLQBd1zkpxx4mP70txoTt9Dw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq5B3pTKOsh-GiVUAIobNwK9KrOiQrL7ZeseY5z1qbIQKeQumSCaLhKeHnUL1B0CIw3oY&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDLpjQVQwW57MdboRAdzyrDbnOsHjrETRTdDYEAAG5U7c53AFgmgzOz5l7pHPL04zgpJk&usqp=CAU',
    'https://em-content.zobj.net/social/emoji/astonished-face.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH53kPyzwBzavXH1-Z1tuYZRCa6BVs3haL2A&usqp=CAU',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Carol_Burnett_1958.JPG/150px-Carol_Burnett_1958.JPG',
    'https://cdn.imgbin.com/22/20/12/imgbin-drawing-fear-emotion-surprise-others-hAX8AmfMhSb8EvgrWe23N5jCy.jpg',
    'https://media.thegospelcoalition.org/wp-content/uploads/2022/10/12093413/surprised-by-oxford-film.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjpfYLarohIg1uBUTVOoEAhrMcoQgGu1QqQ&usqp=CAU',
    'https://images.theconversation.com/files/480739/original/file-20220824-14-3i57gn.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    'https://media.istockphoto.com/id/1270376137/photo/surprised-african-girl-shouting-omg-in-excitement-studio-shot.jpg?b=1&s=170667a&w=0&k=20&c=iBJ-miMdLViKScAHwy-CKWRNBZgGjnuyjNc2SRWiUfg=',
    'https://media.istockphoto.com/id/626205158/photo/portrait-of-young-man-with-shocked-facial-expression.jpg?s=612x612&w=0&k=20&c=0SDJDt1crElYppk8F8Qw-MNeBp3Sr8G7cCs4PAHfEH0=',
    'https://img.freepik.com/free-photo/emotional-bearded-male-has-surprised-facial-expression-astonished-look-dressed-white-shirt-with-red-braces-points-with-index-finger-upper-right-corner_273609-16001.jpg?w=2000',
    'https://media.tenor.com/lrvqsWXk6DEAAAAd/shocked-face-surprised.gif',
    'https://englishhelponline.files.wordpress.com/2011/05/surprisedlady4.gif?w=640',
    'https://cdn.pixabay.com/photo/2020/09/14/18/34/shocked-5571739_1280.png'
  ]
}

const App = () => {
  let video = useRef(null)
  let pixelDiv
  const VIDEO = p5.VIDEO
  let currentEmotion = 'neutral'
  let emotionConfidence = 0
  let videoElem
  let videoPromise
  let emotionImage = useRef('')

  const setup = p5 => {
    p5.noCanvas()
    video = p5.createCapture(VIDEO)
    videoElem = video.elt
    video.size(30, 35)
    video.hide()
    pixelDiv = p5.createDiv()
    // Create the promise and resolve it when the video element is ready
    videoPromise = new Promise((resolve, reject) => {
      video.elt.onloadeddata = () => {
        resolve()
      }
      video.elt.addEventListener('loadedmetadata', () => {
        startVideo()
      })
    })
  }

  const draw = p5 => {
    video.loadPixels()
    emotionImage = ''
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (i + j * video.width) * 4
        const r = video.pixels[pixelIndex + 0]
        const g = video.pixels[pixelIndex + 1]
        const b = video.pixels[pixelIndex + 2]
        const avg = (r + g + b) / 3
        // const len = emotionImages[currentEmotion].length
        const len = emotionImages['disgusted'].length
        const charIndex = Math.floor(p5.map(avg, 0, 255, 0, len))
        // const image = emotionImages[currentEmotion][charIndex]
        const image = emotionImages['disgusted'][charIndex]
        emotionImage += `<img src="${image}">`
      }
      emotionImage += '<br/>'
    }
    pixelDiv.html(emotionImage)
  }

  async function startVideo() {
    navigator.getUserMedia(
      {
        video: {width: 320, height: 240}
      },
      stream => {
        videoElem = document.getElementsByTagName('video')[0]
        videoElem.srcObject = stream
        videoElem.onloadedmetadata = e => {
          videoElem.play()
        }

        videoElem.addEventListener('loadedmetadata', () => {
          const canvas = faceapi.createCanvasFromMedia(videoElem)
          document.body.append(canvas)
          const displaySize = {width: videoElem.width, height: videoElem.height}
          faceapi.matchDimensions(canvas, displaySize)

          setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(videoElem, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            )

            // get the highest scored expression
            if (resizedDetections.length > 0) {
              const expression = resizedDetections[0].expressions

              for (const [expressionName, expressionValue] of Object.entries(
                expression
              )) {
                if (expressionValue > emotionConfidence) {
                  currentEmotion = expressionName
                  emotionConfidence = expressionValue
                }
              }
            }
          }, 100)
        })
      },
      err => {
        console.error(`The following error occurred: ${err.name}`)
      }
    )
  }

  useEffect(() => {
    loadModels().then(() => {
      new p5(p => {
        setup(p)
        p.draw = () => draw(p)
      })
    })
  }, [])

  return <div />
}

export default App
