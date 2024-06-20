import { checkSchema, Schema } from 'express-validator';

const CompanySchema: Schema = {
  activo: {
    optional: true,
    isString: true,
    trim: true,
  },
  name: {
    notEmpty: {
      errorMessage: 'name is required',
    },
    isString: true,
    trim: true,
    isAlphanumeric: true,
  },
  foundation: {
    notEmpty: {
      errorMessage: 'foundation is required',
    },
    isString: true,
    trim: true,
  },
  logo_link: {
    notEmpty: {
      errorMessage: 'logo_link is required',
    },
    isString: true,
    trim: true,
    isURL: true,
  },
  ilustration_link: {
    notEmpty: {
      errorMessage: 'ilustration_link is required',
    },
    isString: true,
    trim: true,
    isURL: true,
  },
  description: {
    notEmpty: {
      errorMessage: 'description is required',
    },
    isString: true,
    trim: true,
  },
  company_size: {
    notEmpty: {
      errorMessage: 'size is required',
    },
    isNumeric: true,
    trim: true,
  },
  sede: {
    notEmpty: {
      errorMessage: 'sede is required',
    },
    isString: true,
    trim: true,
    isAlphanumeric: true,
  },
  founders: {
    notEmpty: {
      errorMessage: 'founders is required',
    },
    isString: true,
    trim: true,
  },
  opportunities: {
    notEmpty: {
      errorMessage: 'opportunities is required',
    },
    isString: true,
    trim: true,
  },
  website_url: {
    notEmpty: {
      errorMessage: 'web_url is required',
    },
    isString: true,
    trim: true,
    isURL: true,
  },
  contact_cid: {
    notEmpty: {
      errorMessage: 'contact_user_id is required',
    },
    isNumeric: true,
    trim: true,
  },
  register_user_id: {
    notEmpty: {
      errorMessage: 'register_user_id is required',
    },
    isNumeric: true,
    trim: true,
  },

  // Sectores
  sectors: {
    notEmpty: {
      errorMessage: 'sector is required',
    },
    isString: true,
    trim: true,
  },
  industry: {
    notEmpty: {
      errorMessage: 'industry is required',
    },
    isString: true,
    trim: true,
  },
  markets: {
    notEmpty: {
      errorMessage: 'market is required',
    },
    isString: true,
    trim: true,
  },
  tech: {
    notEmpty: {
      errorMessage: 'tech is required',
    },
    isString: true,
    trim: true,
  },
  mercado: {
    notEmpty: {
      errorMessage: 'mercado is required',
    },
    isString: true,
    trim: true,
  },

  // Optional fields
  dateinactive: {
    optional: true,
    isString: true,
    trim: true,
  },
  entry: {
    optional: true,
    isString: true,
    trim: true,
  },
  funding: {
    optional: true,
    isString: true,
    trim: true,
  },
  valuation: {
    optional: true,
    isString: true,
    trim: true,
  },
  linkedin_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  youtube_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  twitter_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  facebook_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  instagram_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  alliance: {
    optional: true,
    isString: true,
    trim: true,
  },
  approach: {
    optional: true,
    isString: true,
    trim: true,
  },
  video_url: {
    optional: true,
    isString: true,
    trim: true,
    isURL: true,
  },
  order: {
    optional: true,
    isString: true,
    trim: true,
  },
};

export default checkSchema(CompanySchema);
