/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ContentConfigSchema {
  markdownBooks: MarkdownBook[];
  favicon: string;
  icon: string;
  biography: MarkdownBook;
  [k: string]: unknown;
}
export interface MarkdownBook {
  title: string;
  regex?: string;
  alias: string;
  emoji: string;
  content: string;
  license?: License;
  tags: string[];
  date: string;
  [k: string]: unknown;
}
export interface License {
  name: string;
  url?: string;
  [k: string]: unknown;
}
