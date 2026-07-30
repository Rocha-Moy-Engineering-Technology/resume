<script lang="ts">
  import { SectionId } from '../types/navigation';
  import {
    EXPERIENCE_ENTRIES,
    PORTFOLIO_ENTRIES,
    EDUCATION_ENTRIES,
  } from '../types/resume';
</script>

<section id={SectionId.Resume} class="bg-bg-primary px-6 py-20">
  <div class="mx-auto max-w-6xl">
    <h2 class="text-text-primary mb-12 text-center text-3xl font-bold">
      Resume
    </h2>

    <!-- Experience -->
    <h3 class="text-text-primary mb-8 text-2xl font-semibold">Experience</h3>
    <div class="mb-16 space-y-6">
      {#each EXPERIENCE_ENTRIES as entry (entry.title)}
        <div
          class="hover:shadow-accent/20 group rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            class="mb-3 flex flex-col justify-between md:flex-row md:items-center"
          >
            <h4 class="text-text-primary text-xl font-semibold">
              {entry.title}
            </h4>
            <span class="text-text-secondary text-sm">{entry.dates}</span>
          </div>
          <p class="text-accent mb-3 font-medium">{entry.company}</p>
          <ul class="text-text-secondary mb-4 space-y-1.5 text-sm">
            {#each entry.descriptions as desc, i (i)}
              <li
                class="relative pl-4 before:absolute before:left-0 before:content-['\u2022']"
              >
                {desc}
              </li>
            {/each}
          </ul>
          <div class="flex flex-wrap gap-2">
            {#each entry.technologies as tech (tech)}
              <span
                class="bg-tag-bg text-tag-text hover:bg-accent cursor-default rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 hover:text-white"
              >
                {tech}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Portfolio -->
    <h3 class="text-text-primary mb-8 text-2xl font-semibold">Portfolio</h3>
    <div class="mb-16 space-y-6">
      {#each PORTFOLIO_ENTRIES as entry (entry.title)}
        <div
          class="bg-bg-card/40 border-border/50 hover:shadow-accent/20 group rounded-xl border p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:text-accent-hover text-xl font-semibold transition-colors duration-200"
          >
            {entry.title}
          </a>
          <p class="text-text-secondary mt-3 text-sm">
            {entry.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Education -->
    <h3 class="text-text-primary mb-8 text-2xl font-semibold">Education</h3>
    <div class="space-y-6">
      {#each EDUCATION_ENTRIES as entry (entry.degree)}
        <div
          class="bg-bg-card/40 border-border/50 hover:shadow-accent/20 group rounded-xl border p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            class="flex flex-col justify-between md:flex-row md:items-center"
          >
            <div>
              <h4 class="text-text-primary text-lg font-semibold">
                {entry.degree}
              </h4>
              <p class="text-accent">{entry.institution}</p>
            </div>
            <span class="text-text-secondary text-sm">{entry.dates}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
