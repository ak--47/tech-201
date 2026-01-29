# SE Capstone: 2026

Over the past year and half, we have grown as a team, learning deeply about the technologies that power modern data engineering and analytics.

What started with some [things worth knowing](https://www.notion.so/mxpnl/Tech-101-Things-worth-Knowing-110e0ba925628069a141ff7c32b2d670?source=copy_link) evolved into a comprehensive [101 curriculum](https://www.notion.so/mxpnl/18fe0ba92562809e9ff2fee3d7083d92?v=18fe0ba925628082af94000c38874e2a&source=copy_link) which was so successful that we followed it up with [Tech 201](https://www.notion.so/mxpnl/Tech-201-229e0ba925628035acb4c7b07285c810?source=copy_link) to dive deeper into advanced topics such as [data structures](https://github.com/ak--47/tech-201/blob/main/data-structures.js), [transactional and analytical SQL](https://github.com/ak--47/database-learnin), and [modern cloud data warehouses](https://github.com/ak--47/tech-201/blob/main/data-warehouse.sql).

Pat yourself on the back for making it this far! You've demonstrated commitment, curiosity, and a passion for learning that will serve you well in your future endeavors.

You have now arrived at the **capstone project**, where you will apply all that you've learned in a practical, hands-on way. This is your opportunity to showcase your skills, creativity, and problem-solving abilities that corresponds to your IC level.

## Project Overview

In this capstone project, you will work on a **real-world data engineering problem from start to finish**. You will be responsible for designing and **implementing a data pipeline** that takes **files in google cloud storage** and brings them into Mixpanel as **well-formed events, properties, and users**.

You should then make a ~10min final presentation (slides + code + demo) of your project, highlighting the architecture, technologies used, and any challenges you faced along the way. The Demo will be live for those attending Mixcursion in person, and a recorded video for those not attending .

Your final presentation should include details on:

- The _tools and technologies_ you used
- The _architecture_ of your data pipeline
- Any _modeling/cleaning challenges_ you faced and how you overcame them
- Key _learnings and takeaways_ from the project

We are extremely open to the tools and technologies you choose to use for this project. Feel free to leverage any of the technologies we've covered in our curriculum, or explore new ones that you find interesting. You can use any programming language, data processing framework, or orchestration tool that you are comfortable with. You can use any Gen AI products to help you along the way, but (be warned) the datasets are far too large to fit into an Gen AI's context window.

Should you need access to any Google Cloud or Mixpanel resources, reach out to AK and he'll be happy to assist you.

(hint: loading your dataset into bigQuery is a great starting point! y'all already have access)


## Timing + Deliverables

You need to complete 3 things:

1. proof of a working data pipeline (a mixpanel project filled with data!) that meets the requirements of your IC level dataset
2. A slide deck summarizing your project, including any code snippets, architecture diagrams, and key takeaways; **here is a template you can use for your presentation: [SE Capstone Template - Google Slides](https://docs.google.com/presentation/d/12la6icYmfJzX2gDj8sbDSIVbv9v3yGtch5Mgkcp5AGU/edit?usp=sharing)** 
3. A ~10min presentation of your project

**You are expected to turn your slides and code in on February 6th. You will be presenting your work to your colleagues between February 9th and February 13th.**

THIS IS WHERE YOU TURN IN YOUR ASSETS:
https://docs.google.com/spreadsheets/d/1HYVkSAsSGweEuw6U24kAxcGlcFZkhL2ABgZ3T0cdkz8/edit?usp=sharing

## Datasets

Each IC level has a corresponding dataset with increasing complexity. You are expected to complete the capstone project using the dataset that corresponds to your current IC level.

They are all in the same bucket:

[`gs://se-capstone-2026/`](https://console.cloud.google.com/storage/browser/se-capstone-2026)

And if you want to go above and beyond, feel free to tackle the extra credit section at the end!


#### I.C. LEVEL 3: "A CLEAN START"
A customer wants to buy mixpanel but needs your help loading their POC data into a project. They have all the right primitives in place, but need help verifying the data quality and loading it in. Your job is to design a simple data pipeline that ingests their clean data files and loads them into Mixpanel with minimal transformation.
- [gs://se-capstone-2026/ic3/](https://console.cloud.google.com/storage/browser/se-capstone-2026/ic3)


#### I.C. LEVEL 4: "A SCALING STARTUP"
You are inheriting data from a rapidly growing app with a fragmented tech stack. They have multiple data sources, inconsistent schemas, and incomplete user profiles. Your job is to design a robust data pipeline that can handle the complexity and scale of their data while ensuring data quality and integrity.
- [gs://se-capstone-2026/ic4/](https://console.cloud.google.com/storage/browser/se-capstone-2026/ic4)

	
#### I.C. LEVEL 5: "THE ENTERPRISE MIGRATION"
You are migrating a legacy enterprise client with years of historical debt. Their data is messy, inconsistent, and riddled with edge cases. Your job is to design a comprehensive data pipeline that can clean, transform, and load their data into Mixpanel while addressing the various challenges posed by their legacy systems.
- [gs://se-capstone-2026/ic5/](https://console.cloud.google.com/storage/browser/se-capstone-2026/ic5)



#### Extra Credit
None of these datasets are real. They are all manufactured by AK, based on 10 years of field experience. 

However, if you want to tackle real datasets from the wild, here is the gold mine (extract) of datasets from vendors like Amplitude, Heap, Adobe, mParticle, Segment, and friends, you can do that here:
- [gs://se-capstone-2026/vendors/](https://console.cloud.google.com/storage/browser/se-capstone-2026/vendors)

(hint: [this tool](https://github.com/ak--47/mixpanel-import) might help)
