import os, glob

folder = r'c:\Users\Sherin-Laptop\OneDrive\Desktop\The Code Polymath\Dental Clinic - Clone\dentaire-clone\html.awaikenthemes.com\dentaire'
files = glob.glob(os.path.join(folder, '*.html'))

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False
    
    old_col4 = '<div class="col-lg-4">\n                    <!-- About Footer Start -->\n\n                    <!-- About Footer End -->\n                </div>'
    if old_col4 in content:
        content = content.replace(old_col4, '')
        changed = True

    c1 = '<div class="col-lg-3 col-md-4">\n                    <!-- Footer Quick Links Start'
    c1_new = '<div class="col-lg-4 col-md-4">\n                    <!-- Footer Quick Links Start'
    if c1 in content:
        content = content.replace(c1, c1_new)
        changed = True

    c2 = '<div class="col-lg-3 col-md-4">\n                    <!-- Footer Social Links Start'
    c2_new = '<div class="col-lg-4 col-md-4">\n                    <!-- Footer Social Links Start'
    if c2 in content:
        content = content.replace(c2, c2_new)
        changed = True

    c3 = '<div class="col-lg-2 col-md-4">\n                    <!-- Footer Contact Links Start'
    c3_new = '<div class="col-lg-4 col-md-4">\n                    <!-- Footer Contact Links Start'
    if c3 in content:
        content = content.replace(c3, c3_new)
        changed = True

    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {os.path.basename(file)}')
