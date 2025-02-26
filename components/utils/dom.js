class DomUtils {
  constructor(elements) {
    this.elements = elements;
  }

  addClass(myClass) {
    if (!myClass) {
      throw 'addClass first params is required';
    }
    // if there are no elements, we're done
    if (!this.elements) {
      return;
    }

    // if we have a selector, get the chosen elements
    if (typeof this.elements === 'string') {
      this.elements = document.querySelectorAll(this.elements);
    } else if (this.elements.tagName) {
      this.elements = [this.elements];
    }

    // add class to all chosen elements
    for (let i = 0; i < this.elements.length; i++) {
      // if class is not already found
      if (
        (' ' + this.elements[i].className + ' ').indexOf(' ' + myClass + ' ') <
        0
      ) {
        // add class
        this.elements[i].className += ' ' + myClass;
      }
    }
  }

  removeClass(myClass) {
    if (!myClass) {
      throw 'removeClass first params is required';
    }

    // if there are no elements, we're done
    if (!this.elements) {
      return;
    }

    // if we have a selector, get the chosen elements
    if (typeof this.elements === 'string') {
      this.elements = document.querySelectorAll(this.elements);
    } else if (this.elements.tagName) {
      this.elements = [this.elements];
    }

    // create pattern to find class name
    const reg = new RegExp('(^| )' + myClass + '($| )', 'g');

    // remove class from all chosen elements
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].className = this.elements[i].className.replace(reg, ' ');
    }
  }
}

export default DomUtils;
