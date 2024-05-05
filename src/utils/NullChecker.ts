
class NullChecker {
  isEmpty = (value : string | object | any[] | null | undefined) : boolean => {
    if (typeof value === 'string') {
      return !value || value === '""' || value.length === 0;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      return !value || Object.keys(value).length === 0;
    } else if (typeof value === 'object' && Array.isArray(value)) {
      return !value || value.length === 0;
    } else if (typeof value === 'undefined' || value === null) {
      return true;
    }

    return true;
  }

  fixNullString = (value : string | undefined | null) : string => {
    return !value || this.isEmpty(value) ? '' : value;
  }
}

const instance : NullChecker = new NullChecker();

export default instance;