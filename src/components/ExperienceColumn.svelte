<script lang="ts">
  import { SectionId } from '../types/navigation';
  import {
    PROFILE,
    EXPERIENCE_ENTRIES,
    PORTFOLIO_ENTRIES,
  } from '../types/resume';

  const currentYear = new Date().getFullYear();
</script>

<div id={SectionId.Resume} class="lg:w-3/5 lg:overflow-y-auto">
  <div class="px-8 py-12 lg:px-12 lg:py-16">
    <h2 class="text-text-primary mb-8 text-2xl font-bold">Experience</h2>

    <div class="space-y-0">
      {#each EXPERIENCE_ENTRIES as entry, i (entry.title)}
        <div class="border-border py-6 {i > 0 ? 'border-t' : ''}">
          <div class="mb-2 flex flex-col justify-between md:flex-row md:items-baseline">
            <h3 class="text-text-primary text-lg font-semibold">{entry.title}</h3>
            <span class="text-text-secondary text-sm">{entry.dates}</span>
          </div>
          <p class="text-accent mb-3 text-sm font-medium">{entry.company}</p>
          <ul class="text-text-secondary mb-3 space-y-1 text-sm">
            {#each entry.descriptions as desc, j (j)}
              <li class="relative pl-4 before:absolute before:left-0 before:content-['•']">
                {desc}
              </li>
            {/each}
          </ul>
          <div class="flex flex-wrap gap-1.5">
            {#each entry.technologies as tech (tech)}
              <span class="bg-tag-bg text-tag-text rounded-full px-2.5 py-0.5 text-xs font-medium">
                {tech}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="border-border mt-10 border-t pt-8">
      <h2 class="text-text-primary mb-6 text-2xl font-bold">Portfolio</h2>
      {#each PORTFOLIO_ENTRIES as entry (entry.title)}
        <div class="py-4">
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:text-accent-hover text-lg font-semibold transition-colors duration-200"
          >
            {entry.title}
          </a>
          <p class="text-text-secondary mt-2 text-sm leading-relaxed">
            {entry.description}
          </p>
        </div>
      {/each}
    </div>

    <p class="text-text-secondary mt-10 text-sm">
      &copy; {currentYear} {PROFILE.name}
    </p>
  </div>
</div>
