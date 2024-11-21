export const extractIdFromUrl = (url:string) => {
    try {
      const urlObj = new URL(url);
      const idBien = urlObj.searchParams.get('codigo');
      if (idBien) {
        return idBien;
      } else {
        const regex = /\/bienes\/(\w+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
      }
    } catch (error) {
      console.error('Invalid URL', error);
      return null;
    }
  };
