
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
        pre_tags : ["<mark>"],
        post_tags : ["</mark>"],
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

    // if (textQueryCopy)
    //   elasticQuery.query.bool.must.push({
    //       query_string: {
    //         query: textQueryCopy.replace(' ', '~ '),
    //         fields: ["post_content", "post_title^3"],
    //         fuzziness: '10'
    //     }
    //   });

    if (textQueryCopy) {
      elasticQuery.query.bool.must.push({
        multi_match: {
          query: textQueryCopy,
          fields: ["post_title^5",  "post_content^3",  "acf_cenni_storici",  "acf_cenni_notes"],
          fuzziness: '1',
          slop: "1",
          minimum_should_match: '75%'
        }
      })
    }

    console.log(elasticQuery)

    return elasticQuery
}

export default searchQuery