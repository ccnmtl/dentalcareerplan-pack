Young Children: Standalone Interactive Exercise 
==========

#### Background
North Oralington is a fictitious state created by data from actual counties and locations throughout the U.S.

Two of your classmates, Sally and Sam, are looking for some assistance with their career and practice management decisions as they prepare to move to North Oralington. In the following activity you will learn more about Sally and Sam, and North Oralington. Use the information you learn to help them make an informed career decision.

At the end of the activity, you will have the opportunity to apply the same kind of data analysis and critical thinking to your own future practice aspirations.

#### Young Children module
This interactive is a small piece of the larger Young Children module of [PASS](https://pass.ccnmtl.columbia.edu), a population-based approach to patient services and professional success. PASS was a five-year project to build a website with tools to educate pre-doctoral dental students about patient populations and how demographics play into decision of building a successful dental practice. The PASS content and interactives are being migrated to a sustainable home in the Health Resources and Services Administration [Train](https://www.train.org/) environment.

This and other interactives were developed by the Columbia University [College of Dental Medicine](http://dental.columbia.edu/) in collaboration with the Columbia University [Center ror Teaching & Learning (CTL)](http://ctl.columbia.edu).

REQUIREMENTS
------------
npm
webpack

DEV INSTALLATION
------------
1. Clone the repository
2. Type make runserver. This command will install the necessary npm modules, build the bundle and spin up Webpack's dev server.
3. Navigate to http://localhost:8080.
4. Play around with the interactive!

NPM INSTALLATION
------------
1. npm install dentalcareerplan-pack
2. ./node_modules/webpack/webpack.js --output-path <output_path> --config ./node_modules/dentalcareerplan-pack/webpack.config.js
3. Embed the interactive via an iframe.

#### Sam
```
<code>
    <iframe src="<server>/<output_path>/"></iframe>
</code>
```

#### Sally
```
<code>
    <iframe src="<server>/<output_path>/?actorIdx=1"></iframe>
</code>
```

#### You
```
<code>
    <iframe src="<server>/<output_path>/?actorIdx=2"></iframe>
</code>
```

#### Configuration
The interactive will alert the user on page navigation if the activity is not yet complete. To turn off this behavior, add an ```exit=0``` parameter to the url. For example:

```
<code>
    <iframe src="<server>/<output_path>/?actorIdx=2&exit=0"></iframe>
</code>
```