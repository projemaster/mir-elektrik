#!/usr/bin/env python3
"""
Mir Elektrik Proje - URL Web Kazıma ve Metin Çıkarma Motoru
Python 3 standard kütüphaneleri (urllib, html.parser, re, json) ile bağımlılıksız çalışır.
"""
import sys
import json
import re
import urllib.request
import urllib.error
from html.parser import HTMLParser

class TextExtractParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.skip_tags = {'script', 'style', 'noscript', 'nav', 'footer', 'header', 'svg'}
        self.current_skip = 0
        self.text_chunks = []
        self.headings = []
        self.current_heading_tag = None
        self.current_heading_text = []

    def handle_starttag(self, tag, attrs):
        lower_tag = tag.lower()
        if lower_tag == 'title':
            self.in_title = True
        if lower_tag in self.skip_tags:
            self.current_skip += 1
        if lower_tag in {'h1', 'h2', 'h3', 'h4'}:
            self.current_heading_tag = lower_tag
            self.current_heading_text = []

    def handle_endtag(self, tag):
        lower_tag = tag.lower()
        if lower_tag == 'title':
            self.in_title = False
        if lower_tag in self.skip_tags and self.current_skip > 0:
            self.current_skip -= 1
        if lower_tag in {'h1', 'h2', 'h3', 'h4'} and self.current_heading_tag:
            heading = " ".join(self.current_heading_text).strip()
            if heading:
                self.headings.append({'level': self.current_heading_tag, 'text': heading})
            self.current_heading_tag = None
            self.current_heading_text = []

    def handle_data(self, data):
        if self.in_title:
            self.title += data
            return
        if self.current_skip > 0:
            return
        cleaned = data.strip()
        if cleaned:
            self.text_chunks.append(cleaned)
            if self.current_heading_tag:
                self.current_heading_text.append(cleaned)

def scrape_url(url: str, max_words: int = 15000):
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    }

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            charset = response.headers.get_content_charset() or 'utf-8'
            html_bytes = response.read()
            html_text = html_bytes.decode(charset, errors='replace')
    except Exception as e:
        return {
            'success': False,
            'url': url,
            'error': str(e),
            'content': '',
            'wordCount': 0
        }

    parser = TextExtractParser()
    try:
        parser.feed(html_text)
    except Exception:
        pass

    full_text = " ".join(parser.text_chunks)
    full_text = re.sub(r'\s+', ' ', full_text).strip()

    words = full_text.split()
    total_words = len(words)
    if total_words > max_words:
        full_text = " ".join(words[:max_words]) + f" ... [İçerik {max_words} kelime ile sınırlandırıldı]"

    title = parser.title.strip() or url

    return {
        'success': True,
        'url': url,
        'title': title,
        'headings': parser.headings[:30],
        'content': full_text,
        'wordCount': min(total_words, max_words)
    }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
    else:
        try:
            payload = json.loads(sys.stdin.read())
            target_url = payload.get('url', '')
        except Exception:
            target_url = ''

    if not target_url:
        print(json.dumps({'success': False, 'error': 'URL parametresi bulunamadı'}))
        sys.exit(1)

    result = scrape_url(target_url)
    print(json.dumps(result, ensure_ascii=False))
