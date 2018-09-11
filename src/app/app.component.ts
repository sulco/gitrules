import { Component } from '@angular/core';
import marked from 'marked';

interface Section {
  title: string;
  text: string;
  data: Section[];
}

@Component({
  selector: 'gr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular';
  data: Section[] = [];
  activeSection: Section;
  results: Section[] = [];
  query = '';

  constructor() {
    this.loadRepo();
  }

  search(query: string) {
    const find = (sections: Section[]) => sections.reduce((results, { title, data, text }) => {
      return title.toLowerCase().includes(query.toLowerCase()) && text.length > 3
        ? [...results, { title, text }, ...find(data)]
        : [...results, ...find(data)];
    }, []);

    this.results = find(this.data);
  }

  select(section: Section) {
    this.activeSection = {...section, text: marked(section.text)};
    setTimeout(() => {
      this.query = ' ';
    })
  }

  private parse(lines: string[]) {
    const data: Section[] = [];
    let lastContainer: Section;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        lastContainer = data[data.length] = {
          title: line.replace(/^## /, ''),
          data: [],
          text: '',
        }
      } else if (line.startsWith('### ')) {
        const section = data[data.length - 1].data;
        lastContainer = section[section.length] = {
          title: line.replace(/^### /, ''),
          data: [],
          text: '',
        }
      } else if (line.startsWith('#### ')) {
        if (!data[data.length - 1]) {
          return;
        }
        const section = data[data.length - 1].data;
        const subsection = section[section.length - 1].data;
        lastContainer = subsection[subsection.length] = {
          title: line.replace(/^#### /, ''),
          data: [],
          text: '',
        }
      } else if (lastContainer) {
        lastContainer.text += line + '\n';
      }
      this.data = data;
    });
  }

  async loadRepo() {
    const resp = await fetch('https://api.github.com/repos/k88hudson/git-flight-rules/readme');
    const json = await resp.json();
    const content = atob(json.content);

    this.parse(content.split('\n'));
  }
}
