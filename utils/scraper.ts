import fs from 'fs'

export const delay = (time: any) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const Log = () => {
  const errors:any = []
  return (err: any) => {
    if (!err)
      return errors;
    errors.push(err);
  }
}
export const log = Log();

export const cache_file = (url: string) => `${encodeURIComponent(url)}`

export const concat = (jsonls: any) => {
  const res = {};
  jsonls.forEach((json: JSON) => {
    for (const [key, value] of Object.entries(json)) {
      // @ts-ignore
      res[key] = value;
    }
  });
  return res;
}

export const aggresiveCache = async (max_workers: any, urls: any) => {
  const workers = []
  let count = 0;
  for (let url of urls) {
    workers.push(get(url))
    count = count + 1;
    if (count >= max_workers) {
      count = 0;
      (await Promise.all(workers)).forEach((content: any) => {
        if (content?.length < 100) throw ({ err: "too many jobs, site thinks dos" });
      });
    }
  }
}

export const get = async (url: any) => {
  const file_uri = (url: any) => `file://${process.cwd()}/cache/${encodeURIComponent(cache_file(url))}.html`
  if (!fs.existsSync(`cache/${cache_file(url)}.html`)) {
    let content = ""
    try {
      // @ts-ignore
      for await ( let chunk of ((await fetch(url)).body)) {
        content += Buffer.from(chunk).toString();
      }
    } catch (err) {
      console.error({ uri: url, err: err });
      return "";
    }
    fs.writeFileSync(`cache/${cache_file(url)}.html`, content)
    return content;
  }
  return fs.readFileSync(`cache/${cache_file(url)}.html`, 'utf-8')
}
