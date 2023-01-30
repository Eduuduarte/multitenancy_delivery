# This is a multitenancy project.

<p>The mode of operation that software is work only instances to one or multiple applications operate.</p>

<p>

* [Introdunce](#Introdunce)
* [TheProject](#the-project)

</p>

## Introdunce

### Create project in next
```bash
    npx create-next-app --typescript
```

### Dependencies

#### SVG webpack
```bash
    npm i -D @svgr/webpack
```
##### Config in next.config.js the webpack
```bash
    webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config;
  }
```

## The Project

### Use Swiper React Components

#### Install
```bash
    npm i swiper
    npm i cookies-next
```

##### Typescript

~~~typescript
    import { Swiper, SwiperSlide } from 'swiper/react';
    import { Autoplay } from 'swiper';

    <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false
              }}
              modules={[Autoplay]}
            className={styles.swiper}
            >
            <SwiperSlide className={styles.slide}><img src="/tmp/banner1.png" alt=''/></SwiperSlide>
            <SwiperSlide className={styles.slide}><img src="/tmp/banner2.png" alt=''/></SwiperSlide>
    </Swiper>
~~~

### Formatter currency

~~~javascript
function formtPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    }
~~~