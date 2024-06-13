<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/yannklein/hero-waste">
    <img src="https://github.com/yannklein/hero-waste/assets/26819547/de34bf68-fd02-468b-bf46-a912420785e6"  alt="Logo" width="120" height="120">

  </a>

  <h3 align="center">Hero waste</h3>

  <p align="center">
    A web game to reduce LW Tokyo waste 🤘
    <br />
    <br />
    <a href="#demo">Demo</a>
    ·
    <a href="https://github.com/yannklein/hero-waste/issues">Report Bug</a>
    ·
    <a href="https://github.com/yannklein/hero-waste/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#demo">Demo</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<table >
  <tbody>
    <tr>
      <td width="25%">
        <kbd><img  alt="image" src="https://github.com/yannklein/hero-waste/assets/26819547/4708ed09-a14c-4ab1-9842-65392babaed3"></kbd>
      </td>
      <td>
The project is a NextJS fullstack web application that displays and gamify the waste stats of the Tokyo Le Wagon coding bootcamp cohorts.
The aim of the game is to reduce as much as possible one's cohort waste and to make sure to sort waste correctly.
The waste is counted by scanning a QR code stuck on the garbage can every time the school staff change a garbage bag.
<br><br> 
Some key features of the project:

1. **QR code** generation for each trash can.
2. Integration of **OpenAI API** to generate the waste stats weekly summary.
3. **Job scheduling** to send weekly trash stats notifications.
4. Integration of the **LINE messaging app API** to send LINE notification messages to the users.
5. Use of **Prisma and Vercel** to host and manage the Data layer of the app.

      </td>
    </tr>
  </tbody>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![Next.js][Next.js]][Next-url]
* [![vercel][vercel]][vercel-url]
* [![prisma][prisma]][prisma-url]
* [![openai][openai]][openai-url]
* [![line][line]][line-url]
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Demo
_Note: in the video, "data" and "web" designate the web development and data science course cohorts we have at Le Wagon Tokyo._

https://github.com/yannklein/hero-waste/assets/26819547/e1b828b3-1f8a-4af4-ae88-54f0315e5376


<!-- GETTING STARTED -->

### Prerequisites

This project requires the `vercel`, `next` and `prisma` cli. Check their documentations to install it. (see _Built with_ section links)
The project also requires an OpenAI and LINE API keys.

### Installation

1. After cloning, run `npm install`.
2. Create a `.env` file and add the following keys (add to an existing .env if it has already been created by Vercel):
   ```sh
    WEBSITE_URL="localhost:3000"
    OPENAI_API_KEY="sk-proj-lC7XXXXXXXXXX"
    LINE_ACCESS_TOKEN="A3A0vgRv8lsXXXXXXX"
   ```
   Replace the key values by your own keys.
3. Run 
   ```sh
   npx prisma generate
   prisma db seed
   npm run dev
   ```

Note: This installation explanations doesn't cover the Vercel hosting, the LINE and OpenAI API setups and the steps above might not be enough to run the Hero-Waste app. It should nevertheless give you hints of the way to make it work. Contact me directly if you need more info.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Check and follow the steps of the video <a href="#demo">Demo</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Build the basic pipeline
- [ ] Adapt frontend for any video stream
- [ ] Add websocket for front/back end communication
- [ ] Adapt project for multiple users
- [ ] Store assets on cloud services
- [ ] Improve processing speed

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=FFE466
[Python-url]: https://www.python.org
[ffmpeg]: https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=black
[ffmpeg-url]: https://ffmpeg.org
[chrome]: https://img.shields.io/badge/Chrome%20Extension-lightgray?style=for-the-badge&logo=googlechrome&logoColor=FC521F
[chrome-url]: https://chromewebstore.google.com
[Flask]: https://img.shields.io/badge/flask-black?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[googletranslate]: https://img.shields.io/badge/googletranslate-4285F4?style=for-the-badge&logo=googletranslate&logoColor=white
[googletranslate-url]: https://cloud.google.com/translate
[openai]: https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white
[openai-url]: https://openai.com
[rubyonrails]: https://img.shields.io/badge/rubyonrails-D30001?style=for-the-badge&logo=rubyonrails&logoColor=black
[rubyonrails-url]: https://rubyonrails.org/
[vercel]: https://img.shields.io/badge/vercel-DDDDDD?style=for-the-badge&logo=Vercel&logoColor=black
[vercel-url]: https://vercel.com
[prisma]: https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://prisma.io
[line]: https://img.shields.io/badge/line-00C300?style=for-the-badge&logo=LINE&logoColor=white
[line-url]: https://developers.line.biz/en
