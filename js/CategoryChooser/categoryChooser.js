export default class CategoryChooserModule {
  constructor(dataFilePath, type, injectArea) {
    // console.log(dataFilePath);

    this.dataFilePath = dataFilePath;
    this.injectArea = injectArea
    this.jsonFile = [];

    this.readFile().then((data) => {
        this.jsonFile = data
      let html = this.initializeComponent(type);
        this.render(html)
    });
  }

  async readFile() {
    try {
      const response = await fetch(this.dataFilePath);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      // console.log(data);
      this.jsonFile = data;
      return data;
    } catch (error) {
      console.error("Readfile error", error);
      throw error;
    }
  }

  initializeComponent(type) {
    // console.log(this.jsonFile);
    const data = this.jsonFile[type];

    let html = "";

    // Create numbers of plop button
    data.map((item) => {
    //   console.log(item);
      let innerHTML = `      
      <plop-button-custom
              title = "${item}"
              cta = "${type}-${item}"
              id = "${type}-${item}"
          ></plop-button-custom>`;
    
      html = html + innerHTML
    
        });

        // console.log(html)

        return html
  }

  render(html) {

    this.injectArea.innerHTML = html

  }
}
