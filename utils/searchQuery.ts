
const fieldsMapping = {
    'destinatario': 'meta.acf_destinatario.value'
  }

type ElasticQuery = {
    query: {
        [key in string]:  any;
    },
    highlight: {
        [key in string]: any;
    }
}

const searchQuery = (textQuery: string): ElasticQuery  => {
    let textQueryCopy = textQuery.concat()

    let elasticQuery: ElasticQuery = {
      query: {
        bool: {
          must: [],
        },
      },
      highlight: {
        pre_tags : ["<span>"],
        post_tags : ["</span>"],
        fields : {
            post_content : {},
            post_title: {}
        }
      }
    };

    const destinatario = textQueryCopy?.match(/\(destinatario:[\w ]+\)/)

    if (destinatario && destinatario.length) {
      textQueryCopy = textQueryCopy.replace(/\(destinatario:[\w ]+\)/, '')
      elasticQuery.query.bool.must.push({
          query_string: {
            query: destinatario[0].replace("(destinatario:", '').replace(')', ''),
            fields: [fieldsMapping['destinatario']]
        }
      });
    }

    const exactMatch = textQueryCopy?.match(/".*"!~/);

    exactMatch?.forEach((match) => {
      textQueryCopy = textQueryCopy.replace(match, "");

      elasticQuery.query.bool.must.push({
        multi_match: {
          query: match.replace('"', ""),
          type: "phrase",
          fields: ["post_content", "post_title^3"],
        },
      });
    });

    if (textQueryCopy)
      elasticQuery.query.bool.must.push({
          query_string: {
            query: textQueryCopy,
            fields: ["post_content", "post_title^3"]
        }
      });
    return elasticQuery
}

export default searchQuery